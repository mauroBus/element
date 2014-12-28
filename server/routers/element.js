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
  app.get('/api/elements', elements.query);
  app.post('/api/elements', users.requiresLogin, hasDefaultAuthorization, elements.create);
  app.get('/api/elements/:elementId', elements.read);
  app.put('/api/elements/:elementId', users.requiresLogin, hasDefaultAuthorization, elements.hasAuthorization, elements.update);
  app.del('/api/elements/:elementId', users.requiresLogin, hasDefaultAuthorization, elements.hasAuthorization, elements.delete);
};
