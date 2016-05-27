
var _ = require('lodash'),
    Response = require('../utils/response/response'),
    async = require('async'),
    mongoose = require('mongoose'),
    UsersModel = require('../models/user'),
    Users = mongoose.model('User');

exports.commentById = function(req, res, next, id) {
  var comment = _.findWhere(req.product.comments, { _id: id });
  if (!comment) return next(new Error('Comment with id: "' + id + '" does not exist.'));
  req.comment = comment;
  next();
};

exports.create = function(req, res) {
  var product = req.product;
  var user = req.user;
  var commentTxt = req.body.text;

  if (!commentTxt) {
    return res.status(400).json({message: 'Comment is null.'});
  }

  product.addComment(user, commentTxt, function(err) {
    if (err) {
      return res.status(500).json({message: 'The comment was not created.'});
    }
    res.status(200).json({ message: 'Comment successfuly added.' });
  });
};

exports.delete = function(req, res) {
  var product = req.product;
  product.removeComment(req.param('commentId'), function (err) {
    if (err) {
      res.status(400).json({message: 'The comment was not found.'});
    } else {
      res.status.json({message: 'Comment removed.'});
    }
  });
};

exports.hasDeleteAuthorization = function(req, res, next) {
  if (req.comment.user.toString() === req.user._id.toString()) {
    next();
  } else {
    res.status(401).json({message: 'User not allowed.'});
  }
};

exports.query = function(req, res) {
  var product = req.product,
    pagination = Response.pagination(req),
    from = (pagination.page - 1) * pagination.pageSize,
    comments = product.comments.slice(from, from + pagination.pageSize);

  async.map(comments, function(item, callback) {
    // console.log(item);
    Users.findById({ _id: item.user }, {
      _id: true,
      firstName: true,
      lastName: true,
      displayName: true,
      image: true
    }, function(err, usr) {
      callback(err, _.extend({}, item.toJSON(), { user: usr.toJSON() }));
    });
  },
  function(err, results) {
    res
      .status(200)
      .json(Response.getSuccessResponse(results, product.comments.length, pagination.page, pagination.pageSize));
  });

};
