'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../../utils/response/errors'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    Response = require('../../utils/response/response'),
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

/**
 * Find user by id.
 */
exports.findById = function(req, res, next, id) {
  var objId;
  try {
    objId = new mongoose.Types.ObjectId(id);
  } catch(e) {
    return res.status(404).json({ message: 'The user id is not a valid id.' });
  }

  User.findById(objId, function(err, userById) {
    if (err) return next(err);
    if (!userById) return res.status(404).json({ message: 'Failed to load user with id: ' + id });
    req.userFoundById = userById;
    next();
  });
};

/**
 * Get a user data.
 */
exports.read = function(req, res) {
  if (req.userFoundById.active) {
    var omitions = ['__v', 'email', 'password', 'salt', 'provider', 'providerData', 'additionalProvidersData', 'roles', 'resetPasswordToken', 'resetPasswordExpires', 'active'];
    return res.status(200).json(_.omit(req.userFoundById.toJSON(), omitions));
  } else {
    return res.status(404).json({ message: 'User not found.', error: 'User not found.' });
  }
};
