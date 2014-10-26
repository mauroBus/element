'use strict';

var elements = require('../controllers/elements');
/**
 * Application routes
 */
module.exports = function(app) {
  app.param('elementId', elements.element);
  app.post('/api/elements', elements.create);
  app.get('/api/elements', elements.query);
  app.get('/api/elements/:elementId', elements.show);
  app.put('/api/elements/:elementId', elements.update);
  app.del('/api/elements/:elementId', elements.remove);
};
