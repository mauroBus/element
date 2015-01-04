'use strict';

var products = require('../controllers/products'),
    users = require('../controllers/users'),
    Roles = require('../config/roles'),
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

  // app.param('categoryId', function(c) {return c;});
  // app.get('/api/products/category/:categoryId', products.queryByCategory);
};
