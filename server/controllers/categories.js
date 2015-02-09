'use strict';

var mongoose = require('mongoose'),
    CategoryTree = mongoose.model('CategoryTree'),
    _ = require('lodash'),
    errorHandler = require('../response/errors'),
    Roles = require('../config/roles');
    // Response = require('../response/response'),
    // pagination = require('mongoose-pagination');

// Category Tree example:
// [
//   {
//      "_id": "products",
//      "name": "Products",
//      "path": ",products,",
//      "children": [
//        {
//          "_id": "household",
//          "name": "Household",
//          "path": ",products,household,",
//          "children": [
//             {
//               "_id": "appliance",
//               "name": "Appliance",
//               "path": ",products,household,appliance,",
//               "children": []
//             },
//             {
//               "_id": "electronics",
//               "name": "Electronics",
//               "path": ",products,household,electronics,",
//               "children": []
//             }
//          ]
//       }
//    }
// ]

var denormalizeTree = function(tree, path, matches) {
  matches.push({
    _id: tree._id,
    name: tree.name,
    path: path + tree._id + ','
  });

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
    tree.push({
      _id: child._id,
      name: child.name,
      path: child.path,
      children: []
    });
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
      if (req.param('flat') && req.param('flat').toLowerCase() === 'true') {
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

/**
 * Update a product
 */
exports.update = function(req, res) {
  // var product = req.product;
  // product = _.extend(product, req.body);

  // product.save(function(err) {
  //   if (err) {
  //     return res.status(400).send(errorHandler.getErrorObject(err));
  //   } else {
  //     res.json(product);
  //   }
  // });
};

exports.delete = function(req, res) {
  // var product = req.product;

  // product.remove(function(err) {
  //   if (err) return res.json(500, err);
  //   res.json(product);
  // });
};

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
