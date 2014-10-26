'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config'),
    flash = require('connect-flash');
    // mongoStore = require('connect-mongo')(express);

/**
 * Express configuration
 */
module.exports = function(app, passport) {

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
    app.use(express.bodyParser());

    // connect flash for flash messages
    app.use(flash());

    app.use(express.cookieParser());
    app.use(express.session({ secret: 'keyboard cat' }));

    app.use(passport.initialize());
    app.use(passport.session());

    // Router needs to be last
    app.use(app.router);
  });

};
