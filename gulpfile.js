var gulp = require('gulp');
var merge = require('merge-stream');
var rimraf = require('rimraf');
var package = require('./package.json');

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

/***** Task: Watch Client ******/
gulp.task('watch-client', function() {
  return shelljs.exec('cd ./client && gulp watch && cd ../');
});

/***** Task: Server - To Start the Server App - *****/
gulp.task('serve', function () {
  // start the server:
  // server.run({
  //   file: './server/server.js'
  // });

  // // restart the server when server files change:
  // gulp.watch([
  //   './server/server.js',
  //   './server/routes.js',
  //   './server/controllers/**/*.js',
  //   './server/models/**/*.js'
  // ], [server.run]);

  // .pipe(gulp.run('watch-client')); // do not work.

  nodemon({
    script: './server/server.js',
    watch: [
      './server/server.js',
      './server/routes.js',
      './server/controllers/**/*.js',
      './server/models/**/*.js'
    ],
    ignore: ['ignored.js'],
    nodeArgs: ['--debug']
  })
    .on('restart', function () {
      console.log('restarted!');
    });

});
