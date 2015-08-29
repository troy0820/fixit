var gulp = require('gulp');
var uglify = require('gulp-uglify');


gulp.task('compress',function() {
	return gulp.src('public/javascripts/map.js')
	.pipe(uglify())
	.pipe(gulp.dest('.'));
	console.log('minified');
});
	