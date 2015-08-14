'use strict';

var elements = require('../controllers/elements'),
    users = require('../controllers/users'),
    Roles = require('../config/roles'),
    hasDefaultAuthorization = users.hasAuthorization([Roles.default]);

/**
 * Application routes
 */
module.exports = function(app) {
  app.param('elementId', elements.elementById);

  app.route('/api/elements')
    .get(elements.query)
    .post(users.requiresLogin, hasDefaultAuthorization, elements.create);

  app.route('/api/elements/:elementId')
    .get(elements.read)
    .put(users.requiresLogin, hasDefaultAuthorization, elements.hasAuthorization, elements.update)
    .delete(users.requiresLogin, hasDefaultAuthorization, elements.hasAuthorization, elements.delete);
};
