'use strict';

var categories = require('../controllers/categories'),
    users = require('../controllers/users'),
    Roles = require('../config/roles'),
    // hasDefaultAuthorization = users.hasAuthorization([Roles.default]),
    hasAdminAuthorization = users.hasAuthorization([Roles.admin]);

/**
 * Application routes
 */
module.exports = function(app) {
  // app.param('categoryId', categories.categoryById);

  app.route('/api/categories')
    .get(categories.query)
    .post(users.requiresLogin, hasAdminAuthorization, categories.create);

  // app.get('/api/categories/:categoryId', categories.read);
  // app.put('/api/categories/:categoryId', users.requiresLogin, hasDefaultAuthorization, categories.hasAuthorization, categories.update);
  // app.del('/api/categories/:categoryId', users.requiresLogin, hasDefaultAuthorization, categories.hasAuthorization, categories.delete);

  // app.param('categoryId', function(c) {return c;});
  // app.get('/api/categories/category/:categoryId', categories.queryByCategory);
};
