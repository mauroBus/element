var gulp = require('gulp');
var merge = require('merge-stream');
var rimraf = require('rimraf');
var package = require('./package.json');
var env = require('gulp-env');

// var path = require('path');
var runSequence = require('run-sequence');
var shelljs = require('shelljs');

// to execute the server.
// var server = require('gulp-express');
var nodemon = require('gulp-nodemon');


// General Config:
var config = {
  deploy: 'deploy',
  clientDist: 'client/dist',
  clientDest: 'deploy/public'
};


/***** Task: Build Client *****/
gulp.task('build-client', function() {
  return shelljs.exec('cd ./client && gulp build --production && cd ../');
});

/***** Task: Copy Client *****/
gulp.task('copy-client', ['build-client'], function() {
  return gulp
    .src([config.clientDist + '/**/*.*'])
    .pipe(gulp.dest(config.clientDest, {mode: 0777}));
});

/***** Task: Copy Server *****/
gulp.task('copy-server', function() {
  return gulp
    .src([
      'server/**/*',
      'LICENSE',
      '!server/node_modules/**/*',
      '!server/uploads/*',
      '!server/seed-data/*',
      '!server/seed.js',
      '!server/access.log',
      '!server/gulpfile.js'
    ])
    .pipe(gulp.dest(config.deploy, {mode: 0777}));
});

/***** Task: Clean *****/
gulp.task('clean', function(done) {
  return rimraf(config.deploy, done);
});

/***** Task: Deploy *****/
gulp.task('deploy', function(cbk) {
  /*env({
    vars: {
      NODE_ENV: 'production'
    }
  });
*/
  process.env.NODE_ENV = 'production';

  return runSequence('clean', [
    'copy-client',
    'copy-server'
  ], cbk);
});

/***** Task: Default *****/
gulp.task('default', [
  'deploy'
]);

/***** Task: Watch Client ******/
gulp.task('watch-client', function() {
  return shelljs.exec('cd ./client && gulp watch && cd ../');
});

/***** Task: Server - To Start the Server App - *****/
gulp.task('serve', function () {
  shelljs.exec('cd server && gulp serve');
});
