'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    morgan = require('morgan'),
    logger = require('./logger'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    helmet = require('helmet'),
    passport = require('passport'),
    mongoStore = require('connect-mongo')({
        session: session
    }),
    flash = require('connect-flash'),
    config = require('./config'),
    consolidate = require('consolidate'),
    path = require('path');
    // multer = require('multer')


module.exports = function(db) {
  // Initialize express app
  var app = express();

  // Globbing model files
  config.getGlobbedFiles('./models/**/*.js').forEach(function(modelPath) {
    require(path.resolve(modelPath));
  });

  // Setting application local variables
  app.locals.title = config.app.title;
  app.locals.description = config.app.description;
  app.locals.keywords = config.app.keywords;
  // app.locals.facebookAppId = config.facebook.clientID;

  if (!fs.existsSync(config.uploadDir)){
    fs.mkdirSync(config.uploadDir);
    fs.mkdirSync(config.uploadDirTmp);
  }


  // Passing the request url to environment locals
  app.use(function(req, res, next) {
    res.locals.url = req.protocol + '://' + req.headers.host + req.url;
    next();
  });

  // Should be placed before express.static
  app.use(compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Showing stack errors
  app.set('showStackError', true);

  // Set swig as the template engine
  app.engine('server.view.html', consolidate[config.templateEngine]); // TODO: Review this.

  // Set views path and view engine
  app.set('view engine', 'server.view.html'); // TODO: Review this.
  // app.set('views', './app/views'); // TODO: Review this.
  app.set('views', './templates'); // TODO: Review this.

  // Enable logger (morgan)
  app.use(morgan(logger.getLogFormat(), logger.getLogOptions()));

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Disable views cache
    app.set('view cache', false);
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }


  // app.use(multer({
  //   dest: './uploads/',
  //   limits: {
  //     files: 10,
  //     fileSize: 2,
  //     parts: 10
  //   },
  //   rename: function(fieldname, filename) {
  //     return filename.replace(/\W+/g, '-').toLowerCase();
  //   },
  //   onFileUploadStart: function(file) {
  //     console.log(file.fieldname + ' is starting ...');
  //   },
  //   onFileUploadComplete: function(file) {
  //     console.log(file.fieldname + ' uploaded to  ' + file.path);
  //   },
  //   onError: function(error, next) {
  //     console.log(error);
  //     next(error);
  //   },
  //   onFileSizeLimit: function(file) {
  //     console.log('Failed: ', file.originalname);
  //     fs.unlink('./' + file.path); // delete the partially written file
  //   },
  //   onFilesLimit: function() {
  //     console.log('Crossed file limit!');
  //   }
  // }));

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // CookieParser should be above session
  app.use(cookieParser());

  // Express MongoDB session storage
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    store: new mongoStore({
      db: db.connection.db,
      collection: config.sessionCollection
    }),
    cookie: config.sessionCookie,
    name: config.sessionName
  }));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // connect flash for flash messages
  app.use(flash());

  // Use helmet to secure Express headers
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.use(helmet.ienoopen());
  app.disable('x-powered-by');

  // Setting the app router and static folder
  app.use(express.static(path.resolve(config.root)));

  // Globbing routing files
  config.getGlobbedFiles('./routers/**/*.js').forEach(function(routePath) {
    require(path.resolve(routePath))(app);
  });
  // require('../routers/routes');

  // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
  app.use(function(err, req, res, next) {
    // If the error object doesn't exists
    if (!err) return next();

    // Log it
    console.error(err.stack);

    res.status(500).json({
      error: err.stack
    });
  });

  // Assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).json({
      msg: 'Not Found'
    });
  });

  if (process.env.NODE_ENV === 'secure') {
    // Load SSL key and certificate
    var privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
    var certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');

    // Create HTTPS Server
    var httpsServer = https.createServer({
      key: privateKey,
      cert: certificate
    }, app);

    // Return HTTPS server instance
    return httpsServer;
  }

  // Return Express server instance
  return app;
};
