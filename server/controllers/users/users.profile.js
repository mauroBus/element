'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../../response/errors.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    Response = require('../../response/response'),
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

    user.save(function(err) {
      if (err) {
        return res.status(400).send(errorHandler.getErrorObject(err));
      } else {
        res.json(user);
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
  var publicUser = _.omit(req.user, ['password', 'salt', '__v']);
  res.json(publicUser);
};

/**
 * List users
 */
exports.query = function(req, res) {
  var pagination = Response.pagination(req);

  User
    .find()
    .select('-password -salt -__v')
    .sort('-email')
    .paginate(pagination.page, pagination.pageSize, Response.query(req, res));
};
