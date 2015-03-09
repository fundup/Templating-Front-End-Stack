'use strict';

// include the required packages.
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var swig = require('gulp-swig');
var webserver = require('gulp-webserver');
var changed   = require('gulp-changed'); // only move changed files
var opn       = require('opn'); // for opening the browser


var sourcePaths = {
  styles:     ['assets/css/**/*.styl'],
  templates:  ['views/**/*.html', 'views/*.html'],
  images:     ['assets/img/**/*']
};

var distPaths = {
  styles:     'dist/assets/css',
  templates:  'dist/',
  images:     'dist/assets/img'
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
    .pipe(gulp.dest( distPaths.templates ));
});

//stylus
gulp.task('stylus', function () {
	gulp.src( sourcePaths.styles )
		.pipe(stylus())
		.pipe(gulp.dest( distPaths.styles ));
});

//img
gulp.task('images', function () {
  gulp.src( sourcePaths.images )
    .pipe(changed( distPaths.images ))
    .pipe(gulp.dest( distPaths.images ));
});

//server
gulp.task('webserver', function() {
  gulp.src( [distPaths.templates, '.']  )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port );
});

// Rerun the task when a file changes
gulp.task('watch', function(){
  gulp.watch(sourcePaths.styles, ['stylus']);
  gulp.watch(sourcePaths.templates, ['templates']);
  gulp.watch(sourcePaths.images, ['images']);
});

// The default task (run with just `gulp`) runs 'watch', and starts a local express server
gulp.task('default', ['webserver', 'watch', 'images', 'openbrowser', 'images']);

// The build task
gulp.task('build', ['stylus', 'templates', 'images']);