
var _ = require('lodash'),
    Response = require('../utils/response/response');

exports.commentById = function(req, res, next, id) {
  var comment = req.product.comments.id(id);
  if (!comment) return next(new Error('Comment with id: "' + id + '" does not exist.'));
  req.comment = comment;
  next();
};

exports.create = function(req, res) {
  var product = req.product;
  var user = req.user;
  var commentTxt = req.param('text');

  if (!commentTxt) {
    return res.status(400).json({message: 'Comment is null.'});
  }

  product.addComment(user, commentTxt, function (err) {
    if (err) {
      return res.status(500).json({message: 'The comment was not created.'});
    }
    res.json({ message: 'Comment successfuly added.' });
  });
};

exports.delete = function(req, res) {
  var product = req.product;
  product.removeComment(req.param('commentId'), function (err) {
    if (err) {
      res.sttaus(400).json({message: 'The comment was not found.'});
    } else {
      res.json({message: 'Comment removed.'});
    }
  });
};

exports.hasDeleteAuthorization = function(req, res, next) {
  if (req.comment.user.ref.toString() === req.user._id.toString()) {
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

  res
    .status(200)
    .json(Response.getSuccessResponse(comments, product.comments.length, pagination.page, pagination.pageSize));
};
