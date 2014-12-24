'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    authTypes = ['github', 'twitter', 'facebook', 'google'],
    Roles = require('../config/roles.js');

/**
 * User Schema
 */
var UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: Roles.default
  },
  provider: String,
  hashed_password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  createdAt: {
    type: Date,
    default: new Date()
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

/**
 * Validations
 */
var validatePresenceOf = function(value) {
  return value && value.length;
};


// the below 4 validations only apply if you are signing up traditionally

UserSchema.path('firstName').validate(function(firstName) {
  // if you are authenticating by any of the oauth strategies, don't validate
  return (authTypes.indexOf(this.provider) !== -1) ? true : firstName.length;
}, 'FirstName cannot be blank');

UserSchema.path('email').validate(function(email) {
  // if you are authenticating by any of the oauth strategies, don't validate
  return (authTypes.indexOf(this.provider) !== -1) ? true : email.length;
}, 'Email cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
  // if you are authenticating by any of the oauth strategies, don't validate
  return (authTypes.indexOf(this.provider) !== -1) ? true : hashed_password.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next, done) {
  var self = this;

  if (!this.isNew) { return next(); }

  if (!this.role) {
    this.role = Roles.default;
  }

  mongoose.models.User.findOne({ email : self.email }, function(err, results) {
    if (err) {
      done(err);
    } else if (results) { // the email address is not unique.
      // self.invalidate('email', 'email must be unique');
      next(new Error('Email must be unique'));
    } else if (!validatePresenceOf(self.password) && authTypes.indexOf(self.provider) === -1) {
      next(new Error('Invalid password'));
    } else {
      next();
    }
  });

});

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password) return '';
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  }
};

mongoose.model('User', UserSchema);
