'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    WishList = require('../controllers/wishlist'),
    Roles = require('../config/roles');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  var hasAdminAuthorization = users.hasAuthorization([Roles.admin]);

  // Setting up the users profile api
  app.route('/me')
    .get(users.requiresLogin, users.me)
    .put(users.requiresLogin, users.updateMe);

  app.route('/me/image')
    .post(users.requiresLogin, users.uploadImage)
    .delete(users.requiresLogin, users.deleteImage);

  // app.put('/users', users.update);
  app.get('/users', users.query);
  app.delete('/users/accounts', users.removeOAuthProvider);

  app.route('/users/:userId')
    .put(users.requiresLogin, hasAdminAuthorization, users.update)
    .delete(users.requiresLogin, hasAdminAuthorization, users.delete)
    // .get(users.requiresLogin, users.read);
    .get(users.read);

  // Setting up the users password api
  app.post('/users/password', users.changePassword);
  app.post('/auth/forgot', users.forgot);
  app.get('/api/auth/reset/:token', users.validateResetToken);
  app.post('/api/auth/reset/:token', users.reset);

  // Setting up the users authentication api
  app.post('/auth/signup', users.signup);
  app.post('/auth/signin', users.signin);
  app.get('/auth/signout', users.signout);

  // Setting the facebook oauth routes
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
  }));
  app.get('/auth/facebook/callback', users.oauthCallback('facebook'));

  // Setting the twitter oauth routes
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', users.oauthCallback('twitter'));

  // Setting the google oauth routes
  app.get('/auth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));
  app.get('/auth/google/callback', users.oauthCallback('google'));

  // Setting the linkedin oauth routes
  app.get('/auth/linkedin', passport.authenticate('linkedin'));
  app.get('/auth/linkedin/callback', users.oauthCallback('linkedin'));

  // Setting the github oauth routes
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', users.oauthCallback('github'));

  // Wishlist:
  app.param('wishItemId', WishList.getById);
  app.get('/me/wishlist', users.requiresLogin, WishList.query);
  app.post('/me/wishlist/:productId', users.requiresLogin, WishList.create);
  app.delete('/me/wishlist/:wishItemId', users.requiresLogin, WishList.delete);

  // Finish by binding the user middleware
  app.param('userId', users.userByID);
  app.param('userEmail', users.userByEmail);
};

/**
 * -
 * - Ian webster
 *    textbelt
 *    asterank
 *    inflation calculation
 *
 *
 * 1. chose an idea (no need to be a tech idea)
 *   in the are that you love.
 * 2. start where you love
 *    look for gaps.
 * 3. never stop. you build for yourself, you earn. allways.
 * 4. Make it small.!!
 * 5.
 * 6.
 *
 * KISS (Keep It Simple Stupid)
 */
