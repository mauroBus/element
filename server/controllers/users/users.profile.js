'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../../errors/errors.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

/**
 * Update user details
 */
exports.update = function(req, res) {
  // For security measurement we remove some attrs from the req.body object
  delete req.body.roles;

  var user = req.profile,
      newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        displayName: req.body.displayName,
        email: req.body.email,
        username: req.body.username,
        active: req.body.active,
      };

  if (user) {
    // Merge existing user
    user = _.extend(user, newUser);
    user.updated = Date.now();
    // user.displayName = user.firstName + ' ' + user.lastName;

    // user.update({email: user.email}, user, function(err, numberAffected, rawResponse) {
    user.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        // req.login(user, function(err) {
        //   if (err) {
        //     res.status(400).send(err);
        //   } else {
            res.json(user);
        //   }
        // });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Send Current User
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};


/**
 * List users
 */
exports.query = function(req, res) {
  User.find().sort('-email').exec(function(err, users) {
    if (err) return res.json(500, err);
    res.json(users);
  });
};
