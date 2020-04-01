var gulp = require('gulp'), 
	sass = require('gulp-ruby-sass'), 
	notify = require('gulp-notify'), 
	rename = require('gulp-rename'), 
	concat = require('gulp-concat'), 
	uglify = require('gulp-uglify'), 
	bower = require('gulp-bower'); 
var lib = require('bower-files')(); 
var config = { 
	sassPath: './src/sass', 
	bowerDir: './bower_components' 
} 
gulp.task('bower', function() { 
	return bower() 
		.pipe(gulp.dest(config.bowerDir)); 
}); 
gulp.task('icons', function() { 
	return gulp.src([config.bowerDir + '/fontawesome/fonts/**.*', 
		config.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**.*']) 
		.pipe(gulp.dest('./app/fonts')); 
}); 
gulp.task('js-vendor', function() { 
	gulp.src(lib.ext('js').files) 
		.pipe(concat('vendor.min.js')) 
		.pipe(uglify()) 
		.pipe(gulp.dest('./app/js')); 
});  
gulp.task('css', function() { 
	return sass(config.sassPath + '/main.scss', {loadPath: [ 
			'./src/sass', 
			config.bowerDir + '/bootstrap-sass/assets/stylesheets', 
			config.bowerDir + '/fontawesome/scss' 
		], style: 'compressed',}) 
		.pipe(rename('style.min.css')) 
		.pipe(gulp.dest('./app/css')); 
}); 
gulp.task('watch', function() { 
	gulp.watch(config.sassPath + '/**/*.scss',['css']); 
}); 
gulp.task('default', ['bower', 'icons', 'js-vendor', 'css']); 
