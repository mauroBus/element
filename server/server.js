'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    passport = require('passport');

/**
 * Main application file
 */

// Default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./config/config');

// Connect to database
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

var app = express();

// Passport settings
require('./midlewares/login/passport.js')(passport, config);

// Express settings
require('./config/express')(app, passport);

// Routing
require('./routers/routes.js')(app);

// Start server
app.listen(config.port, config.ipaddr, function () {
  console.log('Express server listening on port %d in %s mode - ip: ' + config.ipaddr, config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
