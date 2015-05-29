
/* 載入modules */
var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    compass      = require('gulp-compass'),
    minifyCss    = require('gulp-minify-css'),
    uglify       = require('gulp-uglify'),
    jshint       = require('gulp-jshint'),
    coffee       = require('gulp-coffee'),
    coffeelint   = require('gulp-coffeelint'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify');

/* define source path */
var source = {
  'fb_webroot' : {
    'scss'  : 'fb_webroot/source/scss',
    'js': 'fb_webroot/source/js'
  },
  'fit_rwd_webroot' : {
    'scss' : 'fit_rwd_webroot/source/scss'
  }
};

/* define destination path */
var dest = {
  'fb_webroot' : {
    'css' : 'fb_webroot/public/css',
    'js'  : 'fb_webroot/public/js'
  },
  'fit_rwd_webroot' : {
    'css' : 'fit_rwd_webroot/public/css'
  }
};

/* default task */
var defaultTask = ['compile-compass','compile-js'];



/* compile compass */
gulp.task('compile-compass', function() {
  //processCompass(source.fb_webroot.scss, dest.fb_webroot.css);
  processCompass(source.fit_rwd_webroot.scss, dest.fit_rwd_webroot.css);
});

/* coffee task */
gulp.task('compile-coffee', function () {
 // ...
});

/* coffee task */
gulp.task('compile-js', function () {
  processJavascript(source.fb_webroot.js, dest.fb_webroot.js);
});

/* watch file */
gulp.task('watch', function () {
  gulp.start(['compile-compass']);

  watchScss(source.fit_rwd_webroot.scss);

  //watchScss(source.fb_webroot.scss);
  //watchJavascript(source.fb_webroot.js);
});

/* default */
gulp.task('default', defaultTask);


function processCompass(source, dest) {
  gulp.src(source + '/**/*.scss')
    .pipe(compass({
      css : dest,
      sass: source,
      comments: false
    }))
    .pipe(gulp.dest(dest))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dest))
    .pipe(notify({message: 'Compass task complete'}));
}

function processCoffee(source, dest) {
  gulp.src(source + '/**/*.coffee')
    .pipe(coffeelint({
      "max_line_length": {
        "level": "ignore"
      }
    }))
    .pipe(coffeelint.reporter())
    .pipe(coffee())
    .pipe(gulp.dest(dest))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dest))
    .pipe(notify({message: 'Coffee task complete'}))
}

function processJavascript(source, dest) {
  gulp.src(source + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(dest))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dest))
    .pipe(notify({message: 'Javascript task complete'}))
}


function watchScss(path) {

  gulp.watch( path +'/**/*.scss', ['compile-compass']);
}

function watchJavascript(path) {
  gulp.watch( path + '/**/*.js', ['compile-js']);
}

function watchCoffee(path) {
  gulp.watch( path + '/**/*.coffee', ['compile-coffee']);
}