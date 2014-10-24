'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * uUser Schema
 */
var UserSchema = new Schema({
  user: String,
  password: String
  // reference: ElementSchema
});

mongoose.model('users', UserSchema);
