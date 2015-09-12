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
    User = mongoose.model('User'),
    Cloud = require('../utils/cloud/cloud'),
    Mailer = require('../utils/mailer/mailer'),
    config = require('../config/config'),
    UsersModel = require('../models/user'),
    Users = mongoose.model('User');

/**
 * Find product by id
 */
exports.productById = function(req, res, next, id) {
  Product.findById(id, function(err, product) {
    if (err) return next(err);
    // if (!product) return next(new Error('Failed to load product ' + id));
    if (!product) return res.status(404).json({ message: 'Failed to load product with id: ' + id });
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
    categPath,
    userFilter = {};

  if (req.query.filter) {
    try {
      userFilter.title = new RegExp(req.query.filter, 'i');
    } catch(e) {
      delete userFilter.title;
    }
  }
  if (req.query.userId) {
    userFilter['user.ref'] = new ObjectId(req.query.userId);
  }

  CategoryTree
    .find({ path: new RegExp(categ) })
    .exec(function(err, results) {
      if (err) { return res.status(500).json(err); }
      if (!results.length) { res.status(400).json({msg: 'Failed to load category ' + categ}); }

      categPath = _.reduce(results, function(result, n, key) {
        return key === 0 ? n._id : (result + '|' + n._id);
      }, {});

      Product
        .find(_.extend({ categories: new RegExp(categPath) }, userFilter), { comments: 0, __v: 0 })
        .sort('-createdAt')
        .paginate(pagination.page, pagination.pageSize, Response.query(req, res));
    });
};

/**
 * Show a product
 */
exports.read = function(req, res) {
  res.status(200).json(_.omit(req.product, ['__v', 'comments']));
};

/**
 * Create a product
 */
exports.create = function(req, res) {
  var product = new Product({
    title: req.body.title,
    description: req.body.description,
    images: [], // empty!
    categories: req.body.categories,
    user: {
      ref: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName
    },
    price: req.body.price,
  });

  product.save(function(err) {
    if (err) return res.status(500).json(err);

    Cloud.uploadImgs(_.pluck(req.body.images, 'url'), function(err, result) {
      // TODO: remove old local files.
      // req.body.images <- remove them.
      if (!err) {
        _.each(result.images, function(img) {
          product.images.push({
            url: img.url,
            publicId: img.public_id,
            width: img.width,
            height: img.height
          });
        });
        product.cloudImgAccountNbr = result.cloudAccNbr;
        product.save(function(err) {
          return res.status(200).json(product);
        });
      } else {
        res.status(200).json(product);
      }
    });
  });


};


var updateImages = function(prodImgs, originalProd, cb) {
  var toUpload = _.filter(prodImgs, function(img) { return !img._id; });
  var toRemove = _.filter(originalProd.images, function(img) {
    return img._id && !_.find(prodImgs, { _id: img._id.toString() });
  });
  var intactImgs = _.filter(originalProd.images, function(img) {
    return img._id && _.find(prodImgs, { _id: img._id.toString() });
  });
  var finalRes = {
    images: intactImgs,
    // cloudImgAccountNbr: null
  };

  if (toUpload.length) {
    Cloud.uploadImgs(_.pluck(toUpload, 'url'), originalProd.cloudImgAccountNbr, function(err, result) {
      if (!err) {
        _.each(result.images, function(img) {
          finalRes.images.push({
            url: img.url,
            publicId: img.public_id,
            width: img.width,
            height: img.height
          });
        });

        // finalRes.cloudImgAccountNbr = result.cloudAccNbr;
        cb(null, finalRes);
      } else {
        cb(err);
      }
    });
  } else {
    cb(null, finalRes);
  }

  if (toRemove.length) {
    Cloud.removeImgs(toRemove, originalProd.cloudImgAccountNbr, function(err, result) {
      if (err) {
        console.log(' [ERROR] on removing product image: ' + err);
      }
    });
  }

  // TODO: remove old local files.
};


/**
 * Update a product
 */
exports.update = function(req, res) {
  var product = req.product;
  var imgsToUpload = [];

  product = _.extend(product, {
    title: req.body.title,
    description: req.body.description,
    // images: req.body.images, // TODO: Handle the update of images.
    categories: req.body.categories,
    price: req.body.price,
    modifiedAt: new Date()
  });

  updateImages(req.body.images, product.toJSON(), function(err, newImagesData) {
    if (!err) {
      product.images = newImagesData.images;
      // product.cloudImgAccountNbr = newImagesData.cloudImgAccountNbr;
      product.save(function(err) {
        if (err) {
          return res.status(400).send(errorHandler.getErrorObject(err));
        } else {
          res.status(200).json(product);
        }
      });
    }
  });

};


/**
 * Delete a product
 */
exports.delete = function(req, res) {
  var product = req.product;
  var cloudImgs = product.images;

  Cloud.removeImgs(cloudImgs, product.cloudImgAccountNbr, function(result) {
    if (!result || !result.deleted) { return; }
    for (var i in result.deleted) {
      if (result.deleted[i] !== 'deleted') {
        console.log('[Deletting image ERROR] - public_id: ' + i);
      }
    }
  });

  product.remove(function(err) {
    if (err) return res.status(500).json(err);
    res.status(200).json(product);
  });

  // Remove product from all wishlists:
  Users.find({ wishList: req.product._id })
    .exec(function(error, users) {
      _.each(users, function(user) {
        _.remove(user.wishList, function(wishItem) {
          return wishItem.equals(req.product._id);
        });
        user.markModified('wishList');
        user.save();
      });
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
      res.status(200).json({ message: 'Successfuly rated.', rate: req.product.rating.value });
    }
  });
};

exports.contact = function(req, res) {
  if (req.product.user.ref.toString() === req.user.id) { // user is the creator.
    return res.status(403).send({
      message: 'User is contacting himself',
      status: 403
    });
  }

  if (!req.body.commentText) {
    return res.status(404).send({
      message: 'commentText must be present.',
      status: 404
    });
  }

  Users
    .findById({ _id: req.product.user.ref })
    .exec(function(error, toUser) {
      if (error && !toUser) {
        return res.status(404).send({
          message: 'Product User does not exist.',
          status: 404
        });
      }
      Mailer.sendMail({
        to: toUser.email,
        replyTo: req.user.email,
        subject: 'You have been contacted for "' + req.product.title + '".',
        templateUrl: 'templates/contact-product.html',
        tplData: {
          name: req.user.displayName,
          appName: config.app.title,
          prod: req.product,
          checkinDate: req.body.checkinDate || new Date(),
          checkoutDate: req.body.checkoutDate || new Date(),
          commentText: req.body.commentText,
          host: config.ipaddr + (config.port ? (':' + config.port) : '')
        },
        cb: function(err, info) {
          if (err) {
            res.status(500).json({
              msg: 'Comment was not sent.',
              error: err
            });
          } else {
            res.status(200).json({
              msg: 'Comment Successfuly Sent.'
            });
          }
        }
      });

    });

};

