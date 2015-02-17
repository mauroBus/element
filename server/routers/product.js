'use strict';

var products = require('../controllers/products'),
    users = require('../controllers/users'),
    Roles = require('../config/roles'),
    Comments = require('../controllers/comments'),
    hasDefaultAuthorization = users.hasAuthorization([Roles.default]);

/**
 * Application routes
 */
module.exports = function(app) {
  app.param('productId', products.productById);
  app.get('/api/products', products.query);
  app.post('/api/products', users.requiresLogin, hasDefaultAuthorization, products.create);
  app.get('/api/products/:productId', products.read);
  app.put('/api/products/:productId', users.requiresLogin, hasDefaultAuthorization, products.hasAuthorization, products.update);
  app.del('/api/products/:productId', users.requiresLogin, hasDefaultAuthorization, products.hasAuthorization, products.delete);

  // comment routes
  app.param('commentId', Comments.commentById);
  app.post('/api/products/:productId/comments', users.requiresLogin, Comments.create);
  app.get('/api/products/:productId/comments', users.requiresLogin, Comments.query);
  app.delete('/api/products/:productId/comments/:commentId', users.requiresLogin, Comments.hasDeleteAuthorization, Comments.delete);

  // app.param('categoryId', function(c) {return c;});
  // app.get('/api/products/category/:categoryId', products.queryByCategory);
};
