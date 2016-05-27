'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../../utils/response/errors'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    Response = require('../../utils/response/response'),
    UserAuth = require('./users.authorization'),
    User = mongoose.model('User'),
    Cloud = require('../../utils/cloud/cloud');


var updateUser = function(req, res, user) {

  var newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    displayName: req.body.displayName,
    // email: req.body.email,
    // username: req.body.username,
    // active: req.body.active,
  };

  if (user) {
    // Merge existing user
    // _.extend(user, newUser);
    user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
    user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
    user.displayName = req.body.displayName ? req.body.displayName : user.displayName;
    user.displayName = req.body.displayName ? req.body.displayName : user.displayName;
    user.updated = Date.now();

    if (req.body.active && UserAuth.hasAuthorization(req.user.roles)) {
      user.active = true;
    }

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

exports.updateMe = function(req, res) {
  updateUser(req, res, req.user); // loged in user.
};

/**
 * Update user details
 */
exports.update = function(req, res) {
  updateUser(req, res, req.profile); // update a given user (filled by getUserByID)
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

  var filter = {};
  if (req.query.filter) {
    filter = {
      $or: [
        { firstName: new RegExp(req.query.filter) },
        { lastName: new RegExp(req.query.filter) },
        { email: new RegExp(req.query.filter) }
      ]
    };
  }

  User
    .find(filter)
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
    req.profile = userById;
    next();
  });
};

/**
 * Get a user data.
 */
exports.read = function(req, res) {
  if (req.profile) {
    var omitions = ['__v', 'email', 'password', 'salt', 'provider', 'providerData', 'additionalProvidersData', 'roles', 'resetPasswordToken', 'resetPasswordExpires'];
    return res.status(200).json(_.omit(req.profile.toJSON(), omitions));
  } else {
    return res.status(404).json({ message: 'User not found.', error: 'User not found.' });
  }
};


// var fileUpload = require('../controllers/fileUpload');
exports.uploadImage = function(req, res) {
  if (!req.body.image) {
    res.status(400).json({ error: '"image" attr is required' });
    return;
  }

  var cb = function(err, result) {
    if (err) { res.status(400).json({ error: err }); }
    else {
      req.user.image = {
        publicId: result.images[0].publicId,
        url: result.images[0].url
      };
      req.user.save(function(err) {
        if (err) { res.status(400).json({ error: err }); }
        else {
          res.json({ image: req.user.image });
        }
      });
    }
  };

  Cloud.uploadImgs([req.body.image], cb, { width: 221, height: 221 });

};

exports.deleteImage = function(req, res) {

};
