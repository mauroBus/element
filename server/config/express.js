'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config');

/**
 * Express configuration
 */
module.exports = function(app) {
  app.configure('development', function(){
    app.use(require('connect-livereload')());
    // app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, '')));
    app.use(express.errorHandler());
    app.set('views', config.root);
  });

  app.configure('production', function(){
    // app.use(express.favicon(path.join(config.root, '', 'favicon.ico')));
    app.use(express.static(path.join(config.root, '')));
    app.set('views', config.root);
  });

  app.configure(function(){
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    // Router needs to be last
    app.use(app.router);
  });
};
