'use strict';

var mongoose = require('mongoose'),
    CategoryTree = mongoose.model('CategoryTree'),
    _ = require('lodash'),
    errorHandler = require('../utils/response/errors'),
    Roles = require('../config/roles');
    // Response = require('../response/response'),
    // pagination = require('mongoose-pagination');

// Category Tree example:
// [
//   {
//      "_id": "products",
//      "name": "Products",
//      "thumb": "thumb-icon-name",
//      "path": ",products,",
//      "children": [
//        {
//          "_id": "household",
//          "name": "Household",
//          "thumb": "thumb-icon-name",
//          "path": ",products,household,",
//          "children": [
//             {
//               "_id": "appliance",
//               "name": "Appliance",
//               "thumb": "thumb-icon-name",
//               "path": ",products,household,appliance,",
//               "children": []
//             },
//             {
//               "_id": "electronics",
//               "name": "Electronics",
//               "thumb": "thumb-icon-name",
//               "path": ",products,household,electronics,",
//               "children": []
//             }
//          ]
//       }
//    }
// ]

var denormalizeTree = function(tree, path, matches) {
  var node = _.pick(tree, ['_id', 'name', 'path', 'thumb', 'img', 'large', 'displayOnHome']);
  node.path = path + tree._id + ',';
  matches.push(node);
  if (!tree.children.length) { return; }

  tree.children.forEach(function(child) {
    denormalizeTree(child, path + tree._id + ',', matches);
  });
};

var insertChildCateg = function(tree, child, childPath) {
  var path = childPath.split(',');

  path.shift(); // ''
  path.pop();   // ''

  if (path.length === 1) {
    tree.push( _.assign({}, child.toJSON(), { children: [] }) );
  } else {
    var elem = _.findWhere(tree, { _id: path[0] });
    if (elem) {
      path.shift();
      insertChildCateg(elem.children, child, ',' + path.join(',') + ',');
    } else {
      throw new Error('Category "' + childPath + '" was not inserted.');
    }
  }

};

var normalizeTree = function(tree) {
  var rootCateg = [];

  tree.forEach(function(child) {
    insertChildCateg(rootCateg, child, child.path);
  });

  return rootCateg;
};


/**
 * Find category by id
 */
exports.categoryById = function(req, res, next, id) {
  CategoryTree.findById(id, function(err, category) {
    if (err) { return next(err); }
    if (!category) { return next(new Error('Failed to load category ' + id)); }
    req.category = category;
    next();
  });
};

exports.findById = function(id, cbk) {
  CategoryTree.findById(id, cbk);
};

/**
 * Categories list
 */
exports.query = function(req, res) {
  CategoryTree
    .find({}, {__v: 0})
    .sort({ path: 1 })
    .exec(function(err, docs) {
      if (err) { return res.status(400).send(errorHandler.getErrorObject(err)); }
      if (req.query.flat && (req.query.flat.toLowerCase() === 'true')) {
        res.json(docs);
      } else {
        try {
          res.json(normalizeTree(docs));
        } catch (e) {
          res.status(500).json({ message: 'Error on category tree normalization. Cause: ' + e.message });
        }
      }
    });
};

/**
 * Show a category
 */
exports.read = function(req, res) {
  res.json(req.category);
};

/**
 * Create a category tree.
 */
exports.create = function(req, res) {
  var categ, treeObjs = [], tree;

  try {
    tree = JSON.parse(req.param('tree'));
    denormalizeTree(_.isArray(tree) ? tree[0] : tree, ',', treeObjs);

    CategoryTree.remove().exec(function(error) {
      if (error) { return res.status(500).json(error); }

      treeObjs.forEach(function(treeObj) {
        categ = new CategoryTree(treeObj);
        categ.save(function(err) {
          if (err) { return res.status(500).json(err); }
        });
      });
    });

    res.json(treeObjs);
  } catch (e) {
    res.status(500).json({ message: 'Category Tree has not been created. Cause: ' + e.message });
  }
};

exports.update = function(req, res) {};
exports.delete = function(req, res) {};

/**
 * Category authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (_.intersection(req.user.roles, [Roles.admin]).length >= 0) { // user is admin.
    return res.status(403).send({
      message: 'User is not authorized',
      status: 403
    });
  }

  next();
};
