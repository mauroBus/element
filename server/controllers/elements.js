'use strict';

var mongoose = require('mongoose'),
  Element = mongoose.model('Element');

/**
 * Find element by id
 */
exports.element = function(req, res, next, id) {
  Element.findById(id, function(err, element) {
    if (err) return next(err);
    if (!element) return next(new Error('Failed to load element ' + id));
    req.element = element;
    next();
  });
};

/**
 * List of elements
 */
exports.query = function(req, res) {
  Element.find().sort('-attr4').exec(function(err, elements) {
    if (err) return res.json(500, err);
    res.json(elements);
  });
};

/**
 * Show a element
 */
exports.show = function(req, res) {
  res.json(req.element);
};

/**
 * Create a element
 */
exports.create = function(req, res) {
  var element = new Element(req.body);

  element.save(function(err) {
    if (err) return res.json(500, err);
    res.json(element);
  });
};

/**
 * Update a element
 */
exports.update = function(req, res) {
  Element.update({ _id: req.element._id }, req.body, { }, function(err, updatedElement) {
    if (err) return res.json(500, err);
    res.json(updatedElement);
  });
};

/**
 * Remove a element
 */
exports.remove = function(req, res) {
  var element = req.element;

  element.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(element);
  });
};
