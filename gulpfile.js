
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

/* define original path */
var ori = {
  'summer_2015' : {
    'scss'  : 'assets/2015/summer/scss',
    'coffee': 'assets/2015/summer/coffee'
  }
};

/* define destination path */
var dest = {
  'summer_2015' : {
    'css' : 'resource/2015/summer/css',
    'js'  : 'resource/2015/summer/js'
  }
};

/* compile compass */
gulp.task('compile-compass', function() {
  processCompass(ori.summer_2015.scss, dest.summer_2015.css);
});

/* coffee task */
gulp.task('compile-coffee', function () {
  processCoffee(ori.summer_2015.coffee, dest.summer_2015.js);
});

/* watch file */
gulp.task('watch', function () {
  watchScss(ori.summer_2015.scss);
  watchCoffee(ori.summer_2015.coffee);
});

/* default */
gulp.task('default', ['compile-compass','compile-coffee']);


function processCompass(ori, dest) {
  gulp.src(ori + '/**/*.scss')
    .pipe(compass({
      css : dest,
      sass: ori,
      comments: false
    }))
    .pipe(gulp.dest(dest))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dest))
    .pipe(notify({message: 'Compass task complete'}));
}

function processCoffee(ori, dest) {
  gulp.src(ori + '/**/*.coffee')
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

function watchScss(path) {
  gulp.watch( path +'/**/*.scss', ['compile-compass']);
}

function watchCoffee(path) {
  gulp.watch( path + '/**/*.coffee', ['compile-coffee']);
}