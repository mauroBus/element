'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user').User,
    _ = require('lodash'),
    mailer = require('../utils/mailer/mailer');


// var Sizes = new Schema({
//   size: {
//     type: String,
//     required: true
//   },
//   available: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 1000
//   },
//   sku: {
//     type: String,
//     required: true,
//     validate: [/[a-zA-Z0-9]/, 'Product sku should only have letters and numbers']
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: 0
//   }
// });

var Images = new Schema({
  kind: {
    type: String,
    enum: ['thumbnail', 'catalog', 'detail', 'zoom'],
    required: true,
    default: 'catalog'
  },
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    require: true
  },
  width: {
    type: Number,
    default: 600
  },
  height: {
    type: Number,
    default: 400
  }
});

// var Variants = new Schema({
//   color: String,
//   images: [Images],
//   sizes: [Sizes]
// });

// var Catalogs = new Schema({
//   name: String
// });


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
  // style: {
  //   type: String,
  //   // unique: true
  // },
  images: [Images],
  categories: {
    type: [String],
    default: [],
  },
  // catalogs: [Catalogs],
  // variants: [Variants],
  createdAt: {
    type: Date,
    default: Date.now
  },
  modifiedAt: {
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
  price: {
    type: Number,
    default: 0
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
  }],
  rating: {
    value: {
      type: Number,
      required: true,
      default: 0
    },
    history: {
      type: [Number],
      default: []
    }
  },
  cloudImgAccountNbr: {
    type: Number,
    default: 0
  }
});


// validations:
Product.path('title').validate(function (v) {
  return v.length >= 5 && v.length <= 55;
}, 'Product title should be between 10 and 55 characters');

Product.path('description').validate(function (v) {
  return v.length >= 10;
}, 'Product description should be longer than 10 characters');



Product.methods = {
  addComment: function(currentUser, comment, cb) {
    var prodUser = this.user,
        prodId = this._id,
        prodTitle = this.title;

    this.comments.push({
      text: comment,
      user: {
        ref: currentUser._id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        displayName: currentUser.displayName
      }
    });

    User.findById(prodUser.ref, function(err, fullProdUser) {
      if (err || !fullProdUser) {
        return cb('Could not find the product user.');
      }
      mailer.sendMail({
        to: fullProdUser.email,
        subject: 'You have a new comment!',
        templateUrl: 'templates/new-comment-email.html',
        tplData: {
          name: fullProdUser.firstName + ' ' + fullProdUser.lastName,
          from: currentUser.displayName,
          comment: comment,
          product: prodTitle
        },
        cb: function(err, info) {
          console.log('Status of email sent for new comment: ', err);
        }
      });
    });

    this.save(function(err) {
      // Adding the comment to the current user.
      currentUser.addComment(comment, prodId, cb);
    });
  },

  removeComment: function(commentId, cb) {
    var index = _.findIndex(this.comments, { id: commentId });
    if (index < 0) { return cb('Comment id: ' + commentId + ' was not found'); }
    this.comments.splice(index, 1);
    this.save(cb);
  },

  // rate product.
  rate: function(val, cb) {
    if (1 <= val <= 5) {
      this.rating.history.push(val);
      var sum = _.reduce(this.rating.history, function(sum, n) {
        return sum + n;
      });
      this.rating.value = sum / this.rating.history.length;
      this.save(cb);
    } else {
      cb(new Error('Rate value not valid. It must be an integer between 1 and 5.'));
    }
  }
};


exports.Product = mongoose.model('Product', Product);
