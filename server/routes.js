'use strict';

var index = require('./controllers'),
    elements = require('./controllers/elements');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.param('elementId', elements.element);
  app.post('/api/elements', elements.create);
  app.get('/api/elements', elements.query);
  app.get('/api/elements/:elementId', elements.show);
  app.put('/api/elements/:elementId', elements.update);
  app.del('/api/elements/:elementId', elements.remove);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};
