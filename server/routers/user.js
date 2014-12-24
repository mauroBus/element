'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');

  // Setting up the users profile api
  app.get('/users/me', users.me);
  app.put('/users', users.update);
  app.get('/users', users.query);
  app.delete('/users/accounts', users.removeOAuthProvider);

  // Setting up the users password api
  app.post('/users/password', users.changePassword);
  app.post('/auth/forgot', users.forgot);
  app.get('/auth/reset/:token', users.validateResetToken);
  app.post('/auth/reset/:token', users.reset);

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

  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};



// 'use strict';

// var passport = require('passport'),
//     users = require('../controllers/users.js');
// /**
//  * Application routes
//  */
// module.exports = function(app) {
//   app.param('userId', users.user);

//   app.get('/api/login', passport.authenticate('local', {
//     // failureRedirect: '/#/login',
//     failureFlash: 'Invalid email or password.'
//   }), users.login);

//   app.get('/api/logout', users.logout);
//   app.post('/api/register', users.create);

//   app.post('/api/users', users.create);
//   app.get('/api/users', users.query);
//   app.get('/api/users/:userId', users.show);
//   app.del('/api/users', users.removeAll);
//   app.del('/api/users/:userId', users.remove);
// };
