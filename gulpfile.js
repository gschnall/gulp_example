var
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss'),
	nodemon = require('gulp-nodemon')
  browserSync = require('browser-sync')
  jsValidate = require('gulp-jsvalidate')
  uncss = require('gulp-uncss')

gulp.task('minify-css', function(){
	gulp.src('public-dev/css/*.css')
		.pipe(concat('application.min.css'))
		.pipe(uglifycss())
		.pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream())
})

gulp.task('js-hint', function(){
  gulp.src('public-dev/*.js')
    .pipe(jsValidate());
})

gulp.task('remove-css', function(){
  gulp.src('public-dev/css/*.css')
    .pipe(uncss({
      html: ['public/index.html', 'views/index.ejs']
    }))
    .pipe(gulp.dest('./out'))
})

gulp.task('minify-js', function(){
	gulp.src('public-dev/js/*.js')
		.pipe(concat('application.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
})

gulp.task('browser-sync', ["nodemon"], function(){
 browserSync.init(null, {
   proxy: 'http://localhost:3000',
   files: ['public-dev/**/*.*'],
   port: 7000
 }) 
})

gulp.task('nodemon', function(){
	nodemon({
		ext: 'js html css',
		env: {'NODE_ENV': 'development'},
	})
})

gulp.watch('public-dev/css/*.css', ['minify-css', 'remove-css'])
gulp.watch('public-dev/js/*.js', ['minify-js', 'js-hint'])

gulp.task('default', ['browser-sync'])
