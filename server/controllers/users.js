'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
  require('./users/users.authentication'),
  require('./users/users.authorization'),
  require('./users/users.password'),
  require('./users/users.profile')
);


// /**
//  * Module dependencies.
//  */

// var mongoose = require('mongoose'),
//     User = mongoose.model('User');

// /**
//  * Auth callback
//  */
// // exports.authCallback = function(req, res, next) {
// //   res.redirect('/');
// // };

// /**
//  * Login User
//  */
// exports.login = function(req, res) {
//   console.log('user "' + req.user.name + '" logged in');
//   res.json({
//     msg: 'logged in',
//     user: req.user,
//     sessionId: req.sessionID
//   });
// };

// /**
//  * Show sign up form
//  */
// // exports.signup = function(req, res) {
// //   res.render('users/signup', {
// //     title: 'Sign up',
// //     user: new User()
// //   });
// // };

// /**
//  * Logout
//  */
// exports.logout = function(req, res) {
//   req.logOut();
//   // req.session.destroy(function(err) {
//   //   // cannot access session here
//   // });
//   res.json({
//     msg: 'logged out'
//   });
// };

// /**
//  * Session
// //  */
// exports.session = function(req, res) {
//   // res.redirect('/');
// };

// /**
//  * Create user (Register)
//  */
// exports.create = function(req, res, next) {
//   var user = new User(req.body);
//   user.provider = 'local';
//   user.save(function(err) {
//     if (err) {
//       return next(new Error('Failed to create User ' + err));
//     }
//     req.logIn(user, function(err) {
//       if (err) return next(err);
//       // return res.redirect('/');
//       res.json({
//         msg: 'user successfuly created',
//         user: {
//           _id: user._id,
//           email: user.email,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           role: user.role
//         }
//       });
//     });
//   });
// };

// /**
//  * Show a user
//  */
// exports.show = function(req, res) {
//   res.json(req.profile);
// };

// /**
//  * Remove an user
//  */
// exports.remove = function(req, res) {
//   var user = req.profile;

//   user.remove(function(err) {
//     if (err) return res.json(500, err);
//     res.json(user);
//   });
// };

// exports.removeAll = function(req, res, next) {
//   User.find().remove(function() {
//     next();
//   });
// };


// /**
//  * Find user by id
//  */
// exports.user = function(req, res, next, id) {
//   User
//     .findOne({ _id : id })
//     .exec(function(err, user) {
//       if (err) return next(err);
//       if (!user) return next(new Error('Failed to load User ' + id));
//       req.profile = user;
//       next();
//     });
// };

// /**
//  * List of users
//  */
// exports.query = function(req, res) {
//   User.find().sort('-name').exec(function(err, elements) {
//     if (err) return res.json(500, err);
//     res.json(elements);
//   });
// };