'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    signConfig = require('./sign-config'),
    users = require('../../controllers/users');

module.exports = function() {
  // Use google strategy
  passport.use(new GoogleStrategy({
      clientID: signConfig.google.clientID,
      clientSecret: signConfig.google.clientSecret,
      callbackURL: signConfig.google.callbackURL,
      passReqToCallback: true
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
        provider: 'google',
        providerIdentifierField: 'id',
        providerData: providerData
      };

      // Save the user OAuth profile
      users.saveOAuthUserProfile(req, providerUserProfile, done);
    }
  ));
};