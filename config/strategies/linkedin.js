'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    LinkedInStrategy = require('passport-linkedin').Strategy,
    signConfig = require('./sign-config'),
    users = require('../../controllers/users');

module.exports = function() {
  // Use linkedin strategy
  passport.use(new LinkedInStrategy({
      consumerKey: signConfig.linkedin.clientID,
      consumerSecret: signConfig.linkedin.clientSecret,
      callbackURL: signConfig.linkedin.callbackURL,
      passReqToCallback: true,
      profileFields: ['id', 'first-name', 'last-name', 'email-address']
    },
    function(req, accessToken, refreshToken, profile, done) {
      // Set the provider data and include tokens
      var providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;

      // Create the user OAuth profile
      var providerUserProfile = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        username: profile.username,
        provider: 'linkedin',
        providerIdentifierField: 'id',
        providerData: providerData
      };

      // Save the user OAuth profile
      users.saveOAuthUserProfile(req, providerUserProfile, done);
    }
  ));
};