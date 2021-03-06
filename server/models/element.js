'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Element Schema
 */
var ElementSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
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
  date: Date,
  like: Number,
  dontLike: Number
});

ElementSchema.pre('save', function(next, done) {
  if (this.isNew) {
    this.like = this.dontLike = 0;
  }
  // this.updatedAt = Date.now();
  next();
});

mongoose.model('Element', ElementSchema);
