'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Element Schema
 */
var ElementSchema = new Schema({
  title: String,
  content: String,
  created: Date,
  date: Date,
  like: Number,
  dontLike: Number
});

ElementSchema.pre('save', function(next, done){
  if (this.isNew) {
    this.created = Date.now();
    this.like = this.dontLike = 0;
  }
  // this.updatedAt = Date.now();
  next();
});

mongoose.model('Element', ElementSchema);
