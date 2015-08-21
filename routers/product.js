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

  app.route('/api/products')
    .get(products.query)
    .post(users.requiresLogin, hasDefaultAuthorization, products.create);

  app.route('/api/products/:productId')
    .get(products.read)
    .put(users.requiresLogin, hasDefaultAuthorization, products.hasAuthorization, products.update)
    .delete(users.requiresLogin, hasDefaultAuthorization, products.hasAuthorization, products.delete);

  // Comments routes
  app.param('commentId', Comments.commentById);
  app.route('/api/products/:productId/comments')
    .post(users.requiresLogin, Comments.create)
    .get(Comments.query);

  app.delete('/api/products/:productId/comments/:commentId', users.requiresLogin, Comments.hasDeleteAuthorization, Comments.delete);

  // Rating routes:
  app.put('/api/products/:productId/rate', users.requiresLogin, products.rate);
  app.put('/api/products/:productId/contact', users.requiresLogin, products.contact);

  // app.param('categoryId', function(c) {return c;});
  // app.get('/api/products/category/:categoryId', products.queryByCategory);
};
