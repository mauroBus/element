'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    Roles = require('../config/roles.js'),
    Config = require('../config/config'),
    _ = require('lodash');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
  return (property && ((this.provider !== 'local' && !this.updated) || property.length));
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
  return (this.provider !== 'local' || (password && password.length > 5));
};

var validateUniqueEmail = function(email, respond) {
  if (!this.isNew) {
    respond(true);
  } else {
    mongoose.models.User.findOne({ email: email }, function(err, user) {
      if (!err && user) { // the email address is not unique.
        respond(false);
      } else {
        respond(true);
      }
    });
  }
};


/**
 * User Schema
 */
var UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your first name']
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your last name']
  },
  displayName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: 'eMail already exists',
    validate: [
      { validator: validateLocalStrategyProperty, msg: 'Please fill in your email' },
      { validator: validateUniqueEmail, msg: 'eMail already exists' }
    ],
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  username: {
    type: String,
    // unique: 'Username already exists',
    required: 'Please fill in a username',
    trim: true
  },
  password: {
    type: String,
    default: '',
    validate: [validateLocalStrategyPassword, 'Password should be longer']
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [{
      type: String,
      enum: [Roles.editor, Roles.admin, Roles.user]
    }],
    default: [Roles.default]
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  active: {
    type: Boolean,
    default: true
  },
  wishList: {
    type: [{
      type: Schema.ObjectId,
      ref: 'Product'
    }]
  },
  comments: {
    type: [{
      text: {
        type: String,
        required: true,
      },
      product: {
        type: Schema.ObjectId,
        ref: 'Product',
        required: true
      }
    }],
    default: []
  },
  phone: {
    type: String
  },
  description: {
    type: String,
    default: 'I\'m a happy ' + Config.app.title + ' user.'
  }
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) { return next(); }

  if (this.password && this.password.length > 5) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

UserSchema.path('phone').validate(function (v) {
  return v.length === 0 || (v.length > 6 && v.length <= 20);
}, 'Phone number should has between 7 and 20 characters');


/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

UserSchema.methods.addToWishList = function(productId, cb) {
  var prod = _.find(this.wishList, function(item) {
    return item.toString() === productId.toString();
  });
  if (prod) {
    return cb('Product id already exists on wish list.');
  }
  this.wishList.push(productId);
  this.save(cb);
};

UserSchema.methods.addComment = function(commentTxt, product, cb) {
  this.comments.push({
    text: commentTxt,
    product: product
  });
  this.save(cb);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

exports.User = mongoose.model('User', UserSchema);
