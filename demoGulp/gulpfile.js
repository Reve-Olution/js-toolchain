var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

var APP_DIR = "app/";
var DIST_DIR = "dist/";

/* Clean APP directory*/
gulp.task('clean', function() {
	return gulp.src(DIST_DIR).pipe(clean());
});

/* Minify CSS, JS and replace links in index.html */
gulp.task('usemin', ['clean'] ,function() {
	return gulp.src(APP_DIR+'index.html')
		.pipe(usemin({
			css: [rev()],
			js: [uglify(), rev()]
		}))
		.pipe(gulp.dest(DIST_DIR));
});

/* Watch all HTML files in directory. When a change happened, 
start the notify task ! */
gulp.task('watch', function() {
	gulp.watch([APP_DIR+"*.html"],['notify']);
});

/* Ask connect server to reload */
gulp.task('notify', function() {
	gulp.src(APP_DIR)
		.pipe(connect.reload());
});

/* Start HTTP Server with livereload */
gulp.task('serve', ['watch'] ,function() {
	connect.server({
		root: APP_DIR,
		livereload: true
	})
});

/* Build task */
gulp.task('build', 
	['usemin']);
