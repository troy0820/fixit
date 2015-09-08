var gulp = require('gulp');
var uglify = require('gulp-uglify');


gulp.task('compress',function() {
	console.log('Minifying......');
	return gulp.src('public/javascripts/map.js')
	.pipe(uglify())
	.pipe(gulp.dest('.'))
	
});
	
gulp.task('default',['compress'], function() {
	console.log('Done Minifying');
});

