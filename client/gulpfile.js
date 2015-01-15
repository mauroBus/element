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
  jsModulesDist: 'dist/js/modules',
  cssDist: 'dist/css',
  fontsDist: 'dist/fonts',
  serverPort: 8080,
  livereloadPort: 12345
};


/***** [Private] Task: Build Index *****/
gulp.task('build-index', function() {
  var modules = shelljs.exec('ls -d src/app/*/ | cut -f3 -d"/"').output.split('\n');
  modules.pop();

  return gulp.src('src/index.ejs')
    .pipe(template({
      pkg: package,
      year: new Date(),
      production: argv.production,
      mainJsName: config.jsName,
      jsModulesDist: config.jsModulesDist,
      modules: modules
    }))
    .pipe(rename('/index.html'))
    .pipe(gulp.dest(config.dist));
});

gulp.task('build-js-common', function() {
  gulp.src('src/common/**/*.js') // all js inside the module folder.
    .pipe(concat('common.js'))
    .pipe(gulp.dest(config.jsDist));
});

gulp.task('build-js-modules', function() {
  var modulesFull = shelljs.exec('ls -d src/app/*/').output.split('\n');
  var modules = shelljs.exec('ls -d src/app/*/ | cut -f3 -d"/"').output.split('\n');
  modulesFull.pop();
  modules.pop();

  _.forEach(modulesFull, function(module, i) {
    gulp.src(module + '/**/*.js') // all js inside the module folder.
      .pipe(concat(modules[i] + '.js'))
      .pipe(gulp.dest(config.jsModulesDist));
  });
});

/***** [Private] Task: Build JS *****/
gulp.task('build-js', ['build-js-modules', 'build-js-common'], function() {
  var now = new Date();
  var modules = shelljs.exec('ls -d src/app/*/ | cut -f3 -d"/"').output.split('\n');
  modules.pop();

  var htmlMinOpts = {
    collapseWhitespace: true,
    conservativeCollapse: true
  };

  return merge(
      gulp.src('src/app/*.js'),
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

/***** [Private] Task: Bootstrap Css *****/
gulp.task('bootstrap-css', function() {
  return gulp.src([
      config.vendor + '/bootstrap-css/css/bootstrap.css',
      config.vendor + '/bootstrap-css/css/bootstrap-theme.css'
    ])
    // .pipe(uncss({
    //   html: glob.sync('src/**/*.html')
    // }))
    .pipe(concat('bootstrap-styles.css'))
    .pipe(gulpIf( argv.production, minifyCss({keepBreaks:true}) ))
    .pipe(gulp.dest(config.cssDist));
});

/***** [Private] Task: Less to Build Css *****/
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

/***** [Private] Task: Copy Static *****/
gulp.task('copy-static', function() {
  return merge(
    // gulp.src(config.vendor + '/bootstrap-css/css/*.css')
    //     .pipe(gulp.dest(config.cssDist)),
    // gulp.src(config.vendor + '/nvd3/nv.d3.css')
    //     // .pipe(gulpIf(argv.production, uglify('', { mangle: false })))
    //     .pipe(gulp.dest(config.cssDist)),
    gulp.src(config.vendor + '/bootstrap-css/fonts/*')
        .pipe(gulp.dest(config.fontsDist)),
    gulp.src(['src/assets/**/*.*', '!src/assets/less/*.*'])
        .pipe(gulp.dest(config.dist)),
    merge(
      gulp.src([
          config.vendor + '/angular/angular.js',
          config.vendor + '/angular-ui-router/release/angular-ui-router.min.js',
          config.vendor + '/angular-resource/angular-resource.js',
          config.vendor + '/angular-animate/angular-animate.js',
          config.vendor + '/d3/d3.min.js',
          // config.vendor + '/nvd3/nv.d3.min.js',
          // config.vendor + '/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.min.js'
        ])
        .pipe(gulpIf(argv.production, uglify('angular.js', { mangle: false })))
        .pipe(concat('angular.js')),
      gulp.src(config.vendor + '/angular-bootstrap/ui-bootstrap-tpls.js')
          .pipe(gulpIf(argv.production, uglify('ui-bootstrap-tpls.js', { mangle: false })))
    ).pipe(gulp.dest(config.jsDist))
  );
});


/***** [Private] Task: Clean *****/
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
  gulp.watch('src/index.ejs', ['build-index']);
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


/***** [Private] Task: Start Serve *****/
gulp.task('start-server', function() {
  shelljs.exec('node --debug ../server/server.js');
});

/***** Task: Serve *****/
gulp.task('serve', ['build', 'start-server'], function() {
});
