var gulp 			= require('gulp'),
	// child_process 	= require('child_process'),
	// jeet 			= require('jeet'),
	nodemon 		= require('gulp-nodemon');
	// browserSync 	= require('browser-sync'),
	// stylus 			= require('gulp-stylus'),
	// connect 		= require ('gulp-connect'),
	// connect         = require('gulp-connect'),
 //    uglify          = require('gulp-uglify'),
 //    concat          = require('gulp-concat'),
 //    ngAnnotate      = require('gulp-ng-annotate'),
 //    htmlmin         = require('gulp-html-minifier'),
 //    livereload      = require('gulp-livereload');

    //nodemon app.js
	gulp.task('dev', function(){
		nodemon({
			script: 'server.js'
		})
	})	


    //NEED TO ADD COMPRESS CSS TASK
	gulp.task('all', ['dev']);