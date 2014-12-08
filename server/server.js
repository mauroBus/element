'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
  config = require('./config/config'),
  mongoose = require('mongoose'),
  chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db.uri, function(err) {
  if (err) {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.log(chalk.red(err));
  }
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('--');
console.log(chalk.green(config.app.title + ' application started'));
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
console.log(chalk.green('Database:\t\t\t' + config.db.uri));
if (process.env.NODE_ENV === 'secure') {
  console.log(chalk.green('HTTPs:\t\t\t\ton'));
}
console.log('--');




// 'use strict';

// var express = require('express'),
//     path = require('path'),
//     fs = require('fs'),
//     mongoose = require('mongoose'),
//     passport = require('passport');

// /**
//  * Main application file
//  */

// // Default node environment to development
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// // Application Config
// var config = require('./config/config');

// // Connect to database
// var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// // Bootstrap models
// var modelsPath = path.join(__dirname, 'models');
// fs.readdirSync(modelsPath).forEach(function (file) {
//   require(modelsPath + '/' + file);
// });

// var app = express();

// // Passport settings
// require('./midlewares/login/passport.js')(passport, config);

// // Express settings
// require('./config/express')(app, passport);

// // // Routing
// // require('./routers/routes.js')(app);

// // Start server
// app.listen(config.port, config.ipaddr, function () {
//   console.log('Express server listening on port %d in %s mode - ip: ' + config.ipaddr, config.port, app.get('env'));
// });

// // Expose app
// exports = module.exports = app;
