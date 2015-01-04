'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    _ = require('lodash'),
    errorHandler = require('../errors/errors'),
    Roles = require('../config/roles');

/**
 * Find product by id
 */
exports.productById = function(req, res, next, id) {
  Product.findById(id, function(err, product) {
    if (err) return next(err);
    if (!product) return next(new Error('Failed to load product ' + id));
    req.product = product;
    next();
  });
};

var _parseFilter = function(req) {
  var filterObj = {};
  if (req.query) {
    if (req.query.category) {
      filterObj['categories.name'] = req.query.category;
    }
  }
  return filterObj;
};

/**
 * List of products
 */
exports.query = function(req, res) {
  Product.find(_parseFilter(req)).sort('-created').exec(function(err, products) {
    if (err) return res.json(500, err);
    res.json(products);
  });
};

/**
 * Show a product
 */
exports.read = function(req, res) {
  res.json(req.product);
};

/**
 * Create a product
 */
exports.create = function(req, res) {
  var product = new Product(req.body);
  product.user.ref = req.user._id;
  product.user.firstName = req.user.firstName;
  product.user.lastName = req.user.lastName;

  product.save(function(err) {
    if (err) return res.json(500, err);
    res.json(product);
  });
};

/**
 * Update a product
 */
exports.update = function(req, res) {
  var product = req.product;
  product = _.extend(product, req.body);

  product.save(function(err) {
    if (err) {
      return res.status(400).send(errorHandler.getErrorObject(err));
    } else {
      res.json(product);
    }
  });
};

/**
 * Delete a product
 */
exports.delete = function(req, res) {
  var product = req.product;

  product.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(product);
  });
};

/**
 * Product authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (_.intersection(req.user.roles, [Roles.admin]).length > 0) { // user is admin.
    next();
    return;
  }

  if (req.product.user.ref.toString() !== req.user.id) { // user is the creator.
    return res.status(403).send({
      message: 'User is not authorized',
      status: 403
    });
  }
  next();
};
