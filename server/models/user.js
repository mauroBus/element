'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  Roles = require('../config/roles.js');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
  return (this.provider !== 'local' || (password && password.length > 5));
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
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in your email'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  username: {
    type: String,
    unique: 'Username already exists',
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
  }
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
  if (this.password && this.password.length > 6) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

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

mongoose.model('User', UserSchema);


// 'use strict';

// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema,
//     crypto = require('crypto'),
//     authTypes = ['github', 'twitter', 'facebook', 'google'],
//     Roles = require('../config/roles.js');

// /**
//  * User Schema
//  */
// var UserSchema = new Schema({
//   firstName: {
//     type: String,
//     required: true
//   },
//   lastName: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   role: {
//     type: String,
//     required: true,
//     default: Roles.default
//   },
//   provider: String,
//   hashed_password: {
//     type: String,
//     required: true
//   },
//   salt: {
//     type: String,
//     required: true
//   },
//   facebook: {},
//   twitter: {},
//   github: {},
//   google: {},
//   createdAt: {
//     type: Date,
//     default: new Date()
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// });

// /**
//  * Virtuals
//  */
// UserSchema
//   .virtual('password')
//   .set(function(password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function() {
//     return this._password;
//   });

// /**
//  * Validations
//  */
// var validatePresenceOf = function(value) {
//   return value && value.length;
// };


// // the below 4 validations only apply if you are signing up traditionally

// UserSchema.path('firstName').validate(function(firstName) {
//   // if you are authenticating by any of the oauth strategies, don't validate
//   return (authTypes.indexOf(this.provider) !== -1) ? true : firstName.length;
// }, 'FirstName cannot be blank');

// UserSchema.path('email').validate(function(email) {
//   // if you are authenticating by any of the oauth strategies, don't validate
//   return (authTypes.indexOf(this.provider) !== -1) ? true : email.length;
// }, 'Email cannot be blank');

// UserSchema.path('hashed_password').validate(function(hashed_password) {
//   // if you are authenticating by any of the oauth strategies, don't validate
//   return (authTypes.indexOf(this.provider) !== -1) ? true : hashed_password.length;
// }, 'Password cannot be blank');


// /**
//  * Pre-save hook
//  */

// UserSchema.pre('save', function(next, done) {
//   var self = this;

//   if (!this.isNew) { return next(); }

//   if (!this.role) {
//     this.role = Roles.default;
//   }

//   mongoose.models.User.findOne({ email : self.email }, function(err, results) {
//     if (err) {
//       done(err);
//     } else if (results) { // the email address is not unique.
//       // self.invalidate('email', 'email must be unique');
//       next(new Error('Email must be unique'));
//     } else if (!validatePresenceOf(self.password) && authTypes.indexOf(self.provider) === -1) {
//       next(new Error('Invalid password'));
//     } else {
//       next();
//     }
//   });

// });

// /**
//  * Methods
//  */
// UserSchema.methods = {
//   /**
//    * Authenticate - check if the passwords are the same
//    *
//    * @param {String} plainText
//    * @return {Boolean}
//    * @api public
//    */
//   authenticate: function(plainText) {
//     return this.encryptPassword(plainText) === this.hashed_password;
//   },

//   /**
//    * Make salt
//    *
//    * @return {String}
//    * @api public
//    */
//   makeSalt: function() {
//     return Math.round((new Date().valueOf() * Math.random())) + '';
//   },

//   /**
//    * Encrypt password
//    *
//    * @param {String} password
//    * @return {String}
//    * @api public
//    */
//   encryptPassword: function(password) {
//     if (!password) return '';
//     return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
//   }
// };

// mongoose.model('User', UserSchema);
