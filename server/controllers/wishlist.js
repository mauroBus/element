
var mongoose = require('mongoose'),
    _ = require('lodash'),
    Response = require('../utils/response/response'),
    Product = mongoose.model('Product');


exports.getById = function(req, res, next, id) {
  // var wishItem = _.findWhere(req.user.wishList, { _id: id });
  for (var i in req.user.wishList) {
    if (req.user.wishList[i].equals(id)) {
      req.wishItemIndex = i;
      return next();
    }
  }
  return next(new Error('Wish item with id: "' + id + '" does not exist.'));
  // if (!wishItem) return next(new Error('Wish item with id: "' + id + '" does not exist.'));
  // req.wishItem = wishItem;
  // next();
};

// Add product to wishlist.
exports.create = function(req, res) {
  var product = req.product;

  req.user.addToWishList(product._id, function(err) {
    if (err) {
      res.status(500).json({ message: 'Could not add product to wish list', error: err });
    } else {
      res.status(200).json({ message: 'Successfuly added to wish list.', wishList: req.user.wishList });
    }
  });
};

exports.delete = function(req, res) {
  req.user.wishList.splice(req.wishItemIndex, 1);
  req.user.save(function(err) {
    if (err) {
      res.status(400).json({message: 'Could not remove product from wish list.'});
    } else {
      res.status(200).json({message: 'Product removed from wish list.'});
    }
  });
};

// exports.hasDeleteAuthorization = function(req, res, next) {
//   if (req.comment.user.ref.toString() === req.user._id.toString()) {
//     next();
//   } else {
//     res.status(401).json({message: 'User not allowed.'});
//   }
// };

exports.query = function(req, res) {
  var user = req.user,
    pagination = Response.pagination(req),
    from = (pagination.page - 1) * pagination.pageSize,
    to = from + pagination.pageSize,
    list = user.wishList.slice(from, to);

  Product.find({ '_id': { $in: list} }, function(err, prods) {
    if (err) { return res.status(400).json({ message: 'Could not get wish list products.', error: err }); }
    res
      .status(200)
      .json(Response.getSuccessResponse(prods, user.wishList.length, pagination.page, pagination.pageSize));
  });
};
