'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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

var Categories = new Schema({
  name: String
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
  categories: [Categories],
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
  }
});

// validation:

Product.path('title').validate(function (v) {
  return v.length >= 10 && v.length <= 55;
}, 'Product title should be between 10 and 55 characters');

Product.path('style').validate(function (v) {
  return v.length < 40;
}, 'Product style attribute should be less than 40 characters');

Product.path('description').validate(function (v) {
  return v.length >= 10;
}, 'Product description should be longer than 10 characters');


var ProductModel = mongoose.model('Product', Product);
