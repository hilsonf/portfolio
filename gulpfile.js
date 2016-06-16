var gulp 			= require('gulp'),
	nodemon 		= require('gulp-nodemon');

    //nodemon app.js
	gulp.task('dev', function(){
		nodemon({
			script: 'app.js'
		})
	})	

    //NEED TO ADD COMPRESS CSS TASK
	gulp.task('all', ['dev']);