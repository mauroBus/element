'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    signConfig = require('./sign-config'),
    users = require('../../controllers/users');

module.exports = function() {
  // Use twitter strategy
  passport.use(new TwitterStrategy({
      consumerKey: signConfig.twitter.clientID,
      consumerSecret: signConfig.twitter.clientSecret,
      callbackURL: signConfig.twitter.callbackURL,
      passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, done) {
      // Set the provider data and include tokens
      var providerData = profile._json;
      providerData.token = token;
      providerData.tokenSecret = tokenSecret;

      // Create the user OAuth profile
      var providerUserProfile = {
        displayName: profile.displayName,
        username: profile.username,
        provider: 'twitter',
        providerIdentifierField: 'id_str',
        providerData: providerData
      };

      // Save the user OAuth profile
      users.saveOAuthUserProfile(req, providerUserProfile, done);
    }
  ));
};