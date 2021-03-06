'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
  User.findById(id).exec(function(err, user) {
    if (err) return next(err);
    if (!user) {
      return res.status(404).json({ msg: 'User with id: "' + id + '" was not found.'});
    }
    req.profile = user;
    next();
  });
};

/**
 * User middleware
 */
exports.userByEmail = function(req, res, next, id) {
  User.findOne({
    email: id
  }).exec(function(err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }

  next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
  var _this = this;

  return function(req, res, next) {
    _this.requiresLogin(req, res, function() {
      if (!req.user.active) {
        return res.status(403).send({
          message: 'User banned',
          status: 403
        });
      }
      if (_.intersection(req.user.roles, roles).length && (!req.profile || (req.user.email !== req.profile.email))) {
        return next();
      } else {
        return res.status(403).send({
          message: 'User is not authorized',
          status: 403
        });
      }
    });
  };
};
