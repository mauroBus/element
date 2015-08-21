'use strict';

var mongoose = require('mongoose'),
    Element = mongoose.model('Element'),
    _ = require('lodash'),
    errorHandler = require('../utils/response/errors'),
    Response = require('../utils/response/response'),
    Roles = require('../config/roles');

/**
 * Find element by id
 */
exports.elementById = function(req, res, next, id) {
  Element.findById(id, function(err, element) {
    if (err) return next(err);
    if (!element) return next(new Error('Failed to load element ' + id));
    req.element = element;
    next();
  });
};

/**
 * List of elements
 */
exports.query = function(req, res) {
  var pagination = Response.pagination(req);

  Element
    .find()
    .sort('-created')
    .paginate(pagination.page, pagination.pageSize, Response.query(req, res));
};

/**
 * Show a element
 */
exports.read = function(req, res) {
  res.json(req.element);
};

/**
 * Create a element
 */
exports.create = function(req, res) {
  var element = new Element(req.body);
  element.user.ref = req.user._id;
  element.user.firstName = req.user.firstName;
  element.user.lastName = req.user.lastName;

  element.save(function(err) {
    if (err) return res.json(500, err);
    res.json(element);
  });
};

/**
 * Update a element
 */
exports.update = function(req, res) {
  var element = req.element;
  element = _.extend(element, req.body);

  element.save(function(err) {
    if (err) {
      return res.status(400).send(errorHandler.getErrorObject(err));
    } else {
      res.json(element);
    }
  });
};

/**
 * Delete a element
 */
exports.delete = function(req, res) {
  var element = req.element;

  element.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(element);
  });
};

/**
 * Element authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (_.intersection(req.user.roles, [Roles.admin]).length > 0) { // user is admin
    next();
    return;
  }

  if (req.element.user.ref.toString() !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized',
      status: 403
    });
  }
  next();
};
