'use strict';

var index = require('./controllers'),
    elements = require('./controllers/elements'),
    passport = require('passport'),
    LocalStrategy = require('passport-local');
    // TwitterStrategy = require('passport-twitter'),
    // GoolgeStrategy = require('passport-google'),
    // FacebookStrategy = require('passport-facebook');

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


  /* user login routes */
  //sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
  app.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin'
    })
  );


  // All other routes to use Angular routing in app/scripts/app.js
  // app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};
