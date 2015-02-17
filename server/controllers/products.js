'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    _ = require('lodash'),
    errorHandler = require('../utils/response/errors'),
    Roles = require('../config/roles'),
    Response = require('../utils/response/response'),
    pagination = require('mongoose-pagination'),
    CategoryTree = mongoose.model('CategoryTree'),
    ObjectId = require('mongoose').Types.ObjectId;

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

/**
 * List of products
 */
exports.query = function(req, res) {
  var pagination = Response.pagination(req);
  var categ = (req.query &&  req.query.category) ? req.query.category : '',
    categPath;
  var userFilter = req.query['user.ref'] ? { 'user.ref': new ObjectId(req.query['user.ref']) } : {};

  CategoryTree
    .find({ path: new RegExp(categ) })
    .exec(function(err, results) {
      if (err) { return res.json(500, err); }
      if (!results.length) { res.status(400).json({msg: 'Failed to load category ' + categ}); }

      categPath = _.reduce(results, function(result, n, key) {
        return key === 0 ? n._id : (result + '|' + n._id);
      }, {});

      Product
        .find(_.extend({ categories: new RegExp(categPath) }, userFilter), { comments: 0, __v: 0 })
        .sort('-created')
        .paginate(pagination.page, pagination.pageSize, Response.query(req, res));
    });
};

/**
 * Show a product
 */
exports.read = function(req, res) {
  res.json(_.omit(req.product, ['__v', 'comments']));
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
