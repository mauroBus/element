'use strict';

var index = require('../controllers'),
    elementRouter = require('./element.js'),
    userRouter = require('./user.js');

/**
 * Application routes
 */
module.exports = function(app) {
  userRouter(app);
  elementRouter(app);

  // All other routes to use Angular routing in app/scripts/app.js
  // app.get('/partials/*', index.partials);
  app.get('/*', index.notFound);
};
