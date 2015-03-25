'use strict';

// include the required packages.
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var swig = require('gulp-swig');
var changed   = require('gulp-changed'); // only move changed files
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var sourcePaths = {
  styles:     ['assets/css/**/*.styl'],
  templates:  ['views/**/*.html', 'views/*.html'],
  images:     ['assets/images/**/*'],
  javascripts:     ['assets/js/*']
};

var distPaths = {
  styles:     'dist/assets/css',
  templates:  'dist/',
  images:     'dist/assets/images',
  javascripts: 'dist/assets/js'
};

var server = {
  host: 'localhost',
  port: '8001'
};

//swig
gulp.task('templates', function() {
  gulp.src( sourcePaths.templates )
    .pipe(swig({
      defaults: {
        cache: false
      }
    }))
    .pipe(gulp.dest( distPaths.templates ))
    .pipe(reload({stream: true}));
});

//stylus
gulp.task('stylus', function () {
  gulp.src( sourcePaths.styles )
    .pipe(stylus())
    .pipe(gulp.dest( distPaths.styles ))
    .pipe(reload({stream: true}));
});

//img
gulp.task('images', function () {
  gulp.src( sourcePaths.images )
    .pipe(changed( distPaths.images ))
    .pipe(gulp.dest( distPaths.images ))
    .pipe(reload({stream: true}));
});

//javascripts
gulp.task('javascripts', function () {
  gulp.src( sourcePaths.javascripts )
    .pipe(changed( distPaths.javascripts ))
    .pipe(gulp.dest( distPaths.javascripts ))
    .pipe(reload({stream: true}));
});

// Rerun the task when a file changes
gulp.task('watch', function(){
  gulp.watch(sourcePaths.styles, ['stylus']);
  gulp.watch(sourcePaths.templates, ['templates']);
  gulp.watch(sourcePaths.images, ['images']);
  //reload browser on change
  gulp.watch(sourcePaths.javascripts, ['javascripts']);
});

// start server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './dist'
        }
    });
});

// The default task (run with just `gulp`) runs 'watch', and starts a local express server
gulp.task('default', ['watch', 'images',
                      'images', 'javascripts', 'browser-sync']);

// The build task
gulp.task('build', ['stylus', 'templates', 'images', 'javascripts']);