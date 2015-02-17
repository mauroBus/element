'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    CategoryTree = mongoose.model('CategoryTree'),
    _ = require('lodash'),
    mailer = require('../utils/mailer/mailer');


var Sizes = new Schema({
  size: {
    type: String,
    required: true
  },
  available: {
    type: Number,
    required: true,
    min: 0,
    max: 1000
  },
  sku: {
    type: String,
    required: true,
    validate: [/[a-zA-Z0-9]/, 'Product sku should only have letters and numbers']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

var Images = new Schema({
  kind: {
    type: String,
    enum: ['thumbnail', 'catalog', 'detail', 'zoom'],
    required: true,
    default: 'catalog'
  },
  url: {
    type: String,
    required: true
  }
});

var Variants = new Schema({
  color: String,
  images: [Images],
  sizes: [Sizes]
});

var Catalogs = new Schema({
  name: String
});


// Product Model
var Product = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  style: {
    type: String,
    // unique: true
  },
  images: [Images],
  categories: {
    type: [String],
    default: [],
    // enum: CategoryTree
  },
  catalogs: [Catalogs],
  // variants: [Variants],
  modified: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    ref: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    firstName: String,
    lastName: String
  },
  comments: [{
    text: {
      type: String,
      required: true,
    },
    user: {
      ref: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
      },
      displayName: String,
      firstName: String,
      lastName: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});


// validations:
Product.path('title').validate(function (v) {
  return v.length >= 10 && v.length <= 55;
}, 'Product title should be between 10 and 55 characters');

Product.path('style').validate(function (v) {
  return v.length < 40;
}, 'Product style attribute should be less than 40 characters');

Product.path('description').validate(function (v) {
  return v.length >= 10;
}, 'Product description should be longer than 10 characters');



Product.methods = {
  addComment: function(user, comment, cb) {
    this.comments.push({
      text: comment,
      user: {
        ref: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName
      }
    });

    mailer.sendMail({
      to: this.user.email,
      subject: 'You have a new comment!',
      templateUrl: 'templates/new-comment-email.html',
      tplData: {
        name: this.user.firstName + this.user.lastName,
        from: user.displayName,
        comment: comment,
        product: this.title
      },
      cb: function(err) {}
    });

    this.save(cb);
  },

  removeComment: function(commentId, cb) {
    var index = _.findIndex(this.comments, { id: commentId });
    if (index < 0) { return cb('Comment id: ' + commentId + ' was not found'); }
    this.comments.splice(index, 1);
    this.save(cb);
  }
};


var ProductModel = mongoose.model('Product', Product);
