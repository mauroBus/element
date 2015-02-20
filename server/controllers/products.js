'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Product = mongoose.model('Product'),
    Roles = require('../config/roles'),
    Response = require('../utils/response/response'),
    CategoryTree = mongoose.model('CategoryTree'),
    ObjectId = require('mongoose').Types.ObjectId,
    errorHandler = require('../utils/response/errors'),
    pagination = require('mongoose-pagination'),
    User = mongoose.model('User');

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
  var product = new Product({
    title: req.body.title,
    description: req.body.description,
    images: req.body.images,
    categories: req.body.categories,
    user: {
      ref: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName
    },
    price: req.body.price,
  });

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
  product = _.extend(product, {
    title: req.body.title,
    description: req.body.description,
    images: req.body.images,
    categories: req.body.categories,
    price: req.body.price,
    modifiedAt: new Date()
  });

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

  if (req.product.user.ref.toString() !== req.user.id) { // user is not the creator.
    return res.status(403).send({
      message: 'User is not authorized',
      status: 403
    });
  }
  next();
};

exports.rate = function(req, res) {
  if (req.product.user.ref.toString() === req.user.id) { // user is the creator.
    return res.status(403).send({
      message: 'User is not authorized to rate its own product',
      status: 403
    });
  }
  req.product.rate(req.body.rating, function(err) {
    if (err) {
      res.status(400).json({ message: 'Could not rate.', error: err });
    } else {
      res.json({ message: 'Successfuly rated.', rate: req.product.rating.value });
    }
  });
};
