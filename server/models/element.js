'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Element Schema
 */
var ElementSchema = new Schema({
  attr1: String,
  attr2: String,
  attr3: Number,
  attr4: Date,
});

ElementSchema.pre('save', function(next, done){
  if (this.isNew) {
    this.attr4 = Date.now();
  }
  // this.updatedAt = Date.now();
  next();
});

mongoose.model('Element', ElementSchema);
