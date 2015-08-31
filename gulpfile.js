var gulp = require('gulp');
var merge = require('merge-stream');
var rimraf = require('rimraf');
var package = require('./package.json');
var env = require('gulp-env');

// var path = require('path');
var runSequence = require('run-sequence');
// var exec = require('child_process').exec;
var shell = require('gulp-shell');

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
gulp.task('build-client', shell.task([
  'cd ./client && \
  gulp build --production && \
  cd ../'
]));

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
      '!server/gulpfile.js',
      '!server/access.log',
      '!server/npm-debug.log'
    ])
    .pipe(gulp.dest(config.deploy, {mode: 0777}));
});

/***** Task: Clean *****/
gulp.task('clean', function(done) {
  return rimraf(config.deploy, done);
});

/***** Task: Build All *****/
gulp.task('build', function(cbk) {
  process.env.NODE_ENV = 'production';

  return runSequence('clean', [
    'copy-client',
    'copy-server'
  ], cbk);
});


/***** Task: Deploy *****/
gulp.task('deploy', ['build'], shell.task([
  'cp -r ./deploy/* ../boxlabs/ && \
   cd ../boxlabs && \
   git add .  && \
   git commit -m "improvement to deploy..." && \
   git push origin master && \
   cd ../element-box'
]));

/***** Task: Default *****/
gulp.task('default', [
  'build'
]);

/***** Task: Watch Client ******/
gulp.task('watch-client', shell.task([
  'cd ./client && gulp watch && cd ..'
]));

/***** Task: Server - To Start the Server App - *****/
gulp.task('serve', shell.task(['cd server && gulp serve']));
