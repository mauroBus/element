var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var template = require('gulp-template');
var header = require('gulp-header');
var htmlmin = require('gulp-htmlmin');

var merge = require('merge-stream');
var rimraf = require('rimraf');
var _ = require('lodash');
var package = require('./package.json');

var less = require('gulp-less'); // less compiler.
var path = require('path');
var livereload = require('gulp-livereload');
var minifyCss = require('gulp-minify-css');
var gulpIf = require('gulp-if');
var argv = require('yargs').argv;
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

var shelljs = require('shelljs');
var uncss = require('gulp-uncss');

var glob = require('glob');


// General Config:
var config = {
  jsName: 'index',
  dist: 'dist',
  vendor: 'vendor',
  jsDist: 'dist/js',
  cssDist: 'dist/css',
  fontsDist: 'dist/fonts',
  serverPort: 8080,
  livereloadPort: 12345
};


/***** Task: Build Index *****/
gulp.task('build-index', function() {
  return gulp.src('src/index.html')
    .pipe(template({
      pkg: package,
      year: new Date(),
      production: argv.production,
      mainJsName: config.jsName
    }))
    .pipe(gulp.dest(config.dist));
});


/***** Task: Build JS *****/
gulp.task('build-js', function() {
  var now = new Date();

  var htmlMinOpts = {
    collapseWhitespace: true,
    conservativeCollapse: true
  };

  return merge(
      gulp.src('src/**/*.js'),
      gulp.src('src/app/**/*.html')
          .pipe(htmlmin(htmlMinOpts))
          .pipe(templateCache({
            standalone: true,
            module: 'templates.app'
          })),
      gulp.src('src/common/**/*.html')
          .pipe(htmlmin(htmlMinOpts))
          .pipe(templateCache({
            standalone: true,
            module: 'templates.common'
          }))
    )
    .pipe(concat(config.jsName + '.js'))
    .pipe(header(
        '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= buildDate %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= copyrightYear %> <%= pkg.author %>;\n*/',
      {
        pkg: package,
        buildDate: now,
        copyrightYear: now.getFullYear()
      }))
    .pipe(gulpIf(argv.production, uglify(config.jsName + '.js', {
        mangle: false
      })))
    .pipe(gulpIf(argv.production, rename({suffix: '.min'})))
    .pipe(gulp.dest(config.jsDist));
});


gulp.task('bootstrap-css', function() {
  return gulp.src([
      config.vendor + '/bootstrap-css/css/bootstrap.css',
      config.vendor + '/bootstrap-css/css/bootstrap-theme.css'
    ])
    .pipe(uncss({
      html: glob.sync('src/**/*.html')
    }))
    .pipe(concat('bootstrap-styles.css'))
    .pipe(gulpIf( argv.production, minifyCss({keepBreaks:true}) ))
    .pipe(gulp.dest(config.cssDist));
});

/***** Task: Less to Build Css *****/
gulp.task('build-css', ['bootstrap-css'], function() {
  return gulp.src([
      './src/assets/less/app.less',
      './src/app/**/*.less',
      './src/common/directives/**/*.less'
    ])
    .pipe(concat('styles.css'))
    .pipe(less()) // {paths: [ path.join(__dirname, 'less', 'includes') ]}
    .pipe(gulpIf( argv.production, minifyCss({keepBreaks:true}) ))
    .pipe(gulp.dest(config.cssDist));
});

/***** Task: Copy Static *****/
gulp.task('copy-static', function() {
  return merge(
    // gulp.src(config.vendor + '/bootstrap-css/css/*.css')
    //     .pipe(gulp.dest(config.cssDist)),
    gulp.src(config.vendor + '/nvd3/nv.d3.css')
        .pipe(gulp.dest(config.cssDist)),
    gulp.src(config.vendor + '/bootstrap-css/fonts/*')
        .pipe(gulp.dest(config.fontsDist)),
    gulp.src(['src/assets/**/*.*', '!src/assets/less/*.*'])
        .pipe(gulp.dest(config.dist)),
    merge(
      gulp.src([
          config.vendor + '/angular/angular.js',
          config.vendor + '/angular-route/angular-route.js',
          config.vendor + '/angular-resource/angular-resource.js',
          config.vendor + '/angular-animate/angular-animate.js',
          config.vendor + '/d3/d3.min.js',
          config.vendor + '/nvd3/nv.d3.min.js',
          config.vendor + '/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.min.js'
        ])
        .pipe(concat('angular.js')),
      gulp.src(config.vendor + '/angular-bootstrap/ui-bootstrap-tpls.js')
    ).pipe(gulp.dest(config.jsDist))
  );
});


/***** Task: Clean *****/
gulp.task('clean', function(done) {
  return rimraf(config.dist, done);
});


/***** Task: Lint *****/
gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});


/***** Task: Watch *****/
gulp.task('watch', ['lint', 'build'], function() {
  livereload.listen(config.livereloadPort);

  gulp.watch('src/**/*.js', ['lint', 'build-js']);
  gulp.watch(['src/**/*.html', '!src/index.html'], ['build-js']);
  gulp.watch('src/index.html', ['build-index']);
  gulp.watch(['src/assets/**/*.*', '!src/assets/less/*.less'], ['copy-static']);
  gulp.watch([
      'src/assets/less/*.less',
      'src/app/**/*.less',
      'src/common/directives/**/*.less'
    ],
    [
      'build-css'
    ])
    .on('change', livereload.changed);
});


/***** Task: Build *****/
gulp.task('build', function(cbk) {
  return runSequence('clean', [
    'copy-static',
    'build-index',
    'build-js',
    'build-css'
  ],
  cbk);
});


/***** Task: Default *****/
gulp.task('default', [
  'lint',
  'build'
]);



gulp.task('start-server', function() {
  shelljs.exec('node --debug ../server/server.js');
});

/***** Task: Serve *****/
gulp.task('serve', ['build', 'start-server'], function() {
});
