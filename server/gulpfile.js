var gulp = require('gulp');
// to execute the server:
// var server = require('gulp-express');
var nodemon = require('gulp-nodemon');

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
    script: 'server.js',
    // ext: 'js html',
    env: { 'NODE_ENV': 'development' },
    watch: [
      './server.js',
      './routes.js',
      './controllers/**/*.js',
      './models/**/*.js'
    ],
    // ignore: ['ignored.file.js'],
    nodeArgs: ['--debug=5858']
  })
    .on('restart', function () {
      console.log('----------> restarted!');
    });
});

gulp.task('default', ['serve']);
