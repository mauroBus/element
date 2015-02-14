'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../../response/errors'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User'),
    Roles = require('../../config/roles'),
    UsersAuthorization = require('./users.authorization'),
    async = require('async'),
    nodemailer = require('nodemailer'),
    config = require('../../config/config'),
    fs = require('fs');


var smtpTransport = nodemailer.createTransport(config.mailer.options);

/**
 * Signup
 */
exports.signup = function(req, res) {
  // For security measurement we remove the roles from the req.body object
  delete req.body.roles;
  delete req.body.active;

  // Init Variables
  var user = new User(req.body);
  var message = null;

  // Add missing user fields
  user.provider = 'local';
  user.displayName = user.displayName || user.firstName + ' ' + user.lastName;

  // Then save the user.
  user.save(function(err) {
    if (err) {
      return res.status(400).json(errorHandler.getErrorObject(err));
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      async.waterfall([
        // login user:
        function(done) {
          req.login(user, function(err) {
            if (err) {
              res.status(400).json(errorHandler.getErrorObject(err));
            } else {
              done(err, user);
            }
          });
        },
        // Fetching wellcome emai tpl.
        function(user, done) {
          fs.readFile('templates/signup-wellcome-email.html', function(err, emailTpl) {
            var compiled = _.template(emailTpl);
            done(err, compiled({ name: user.displayName, appName: config.app.title }), user);
          });
        },
        // Sending email.
        function(emailTpl, user, done) {
          var mailOptions = {
            to: user.email,
            from: config.mailer.from,
            subject: 'Wellcome to ' + config.app.title + '!',
            html: emailTpl
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            if (!err) {
              res.json({
                user: user,
                sessionId: req.sessionID,
                message: 'An email has been sent to ' + user.email + ' with further instructions.'
              });
            } else {
              return res.json({
                user: user,
                sessionId: req.sessionID,
                message: 'Failure sending the email to the given address.'
              });
            }

            done(err);
          });
        }
      ], function(err) {
        if (!err) {
          res.json({
            user: user,
            sessionId: req.sessionID
          });
        } else {
          return res.status(400).json(errorHandler.getErrorObject(err));
        }
      }); // !waterfall

    }
  });
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      res.status(400).json(info);
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      if (!user.active) {
        return res.status(403).send({
          message: 'User banned',
          status: 403
        });
      }

      req.login(user, function(err) {
        if (err) {
          res.status(400).json(errorHandler.getErrorObject(err));
        } else {
          res.json({
            user: user,
            sessionId: req.sessionID
          });
        }
      });
    }
  })(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
  req.logout();
  res.json({
    user: null,
    sessionId: null,
    msg: 'successfuly signed out.'
  });
  // res.redirect('/');
};

/**
 * OAuth callback
 */
exports.oauthCallback = function(strategy) {
  return function(req, res, next) {
    passport.authenticate(strategy, function(err, user, redirectURL) {
      if (err || !user) {
        return res.redirect('/#!/signin');
      }
      req.login(user, function(err) {
        if (err) {
          return res.redirect('/#!/signin');
        }

        return res.redirect(redirectURL || '/');
      });
    })(req, res, next);
  };
};

/**
 * Helper function to save or update a OAuth user profile
 */
exports.saveOAuthUserProfile = function(req, providerUserProfile, done) {
  if (!req.user) {
    // Define a search query fields
    var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
    var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;

    // Define main provider search query
    var mainProviderSearchQuery = {};
    mainProviderSearchQuery.provider = providerUserProfile.provider;
    mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

    // Define additional provider search query
    var additionalProviderSearchQuery = {};
    additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

    // Define a search query to find existing user with current provider profile
    var searchQuery = {
      $or: [mainProviderSearchQuery, additionalProviderSearchQuery]
    };

    User.findOne(searchQuery, function(err, user) {
      if (err) {
        return done(err);
      } else {
        if (!user) {
          var possibleUsername = providerUserProfile.username || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '');

          User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
            user = new User({
              firstName: providerUserProfile.firstName,
              lastName: providerUserProfile.lastName,
              username: availableUsername,
              displayName: providerUserProfile.displayName,
              email: providerUserProfile.email,
              provider: providerUserProfile.provider,
              providerData: providerUserProfile.providerData
            });

            // And save the user
            user.save(function(err) {
              return done(err, user);
            });
          });
        } else {
          return done(err, user);
        }
      }
    });
  } else {
    // User is already logged in, join the provider data to the existing user
    var user = req.user;

    // Check if user exists, is not signed in using this provider, and doesn't have that provider data already configured
    if (user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
      // Add the provider data to the additional provider data field
      if (!user.additionalProvidersData) user.additionalProvidersData = {};
      user.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;

      // Then tell mongoose that we've updated the additionalProvidersData field
      user.markModified('additionalProvidersData');

      // And save the user
      user.save(function(err) {
        return done(err, user, '/#!/settings/accounts');
      });
    } else {
      return done(new Error('User is already connected using this provider'), user);
    }
  }
};

/**
 * Remove OAuth provider
 */
exports.removeOAuthProvider = function(req, res, next) {
  var user = req.user;
  var provider = req.param('provider');

  if (user && provider) {
    // Delete the additional provider
    if (user.additionalProvidersData[provider]) {
      delete user.additionalProvidersData[provider];

      // Then tell mongoose that we've updated the additionalProvidersData field
      user.markModified('additionalProvidersData');
    }

    user.save(function(err) {
      if (err) {
        return res.status(400).json(errorHandler.getErrorObject(err));
      } else {
        req.login(user, function(err) {
          if (err) {
            res.status(400).json(errorHandler.getErrorObject(err));
          } else {
            res.json(user);
          }
        });
      }
    });
  }
};

/**
 * Soft delete a user.
 */
exports.delete = function(req, res, next) {
  var user = req.profile;
  user.active = false;
  user.save(function(err) {
    if (err) {
      return res.json(500, errorHandler.getErrorObject(err));
    } else {
      res.json({
        message: 'User Successfuly deactivated.'
      });
    }
  });
};

