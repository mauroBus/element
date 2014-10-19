var gulp = require('gulp');
// var merge = require('merge-stream');
var rimraf = require('rimraf');
var package = require('./package.json');

// var path = require('path');
var runSequence = require('run-sequence');
var shelljs = require('shelljs');


// General Config:
var config = {
  deploy: 'deploy',
  clientDist: 'client/dist',
  clientDest: 'deploy/public'
};


/***** Task: Build Client *****/
gulp.task('build-client', function() {
  return shelljs.exec('cd ./client && gulp build && cd ../');
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
    .src(['server/**/*', 'LICENSE'])
    .pipe(gulp.dest(config.deploy, {mode: 0777}));
});

/***** Task: Clean *****/
gulp.task('clean', function(done) {
  return rimraf(config.deploy, done);
});

/***** Task: Build *****/
gulp.task('deploy', function(cbk) {
    return runSequence('clean', [
      'copy-client',
      'copy-server'
    ], cbk);
  }
);

/***** Task: Default *****/
gulp.task('default', [
  'deploy'
]);
