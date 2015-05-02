'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategoyTreeSchema = new Schema({
  _id: String,
  name: String,
  path: {
    type: String,
    unique: true
  },
  thumb: {
    type: String,
    default: ''
  },
  img: {
    type: String,
    default: ''
  },
  large: {
    type: Boolean,
    default: false
  },
  displayOnHome: {
    type: Boolean,
    default: false
  }
  // children: String
});

mongoose.model('CategoryTree', CategoyTreeSchema);
