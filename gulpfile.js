var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
	return gulp.src('./src/styles/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: [
				'> 1%',
				'last 2 versions',
				'firefox >= 4',
				'safari 7',
				'safari 8',
				'IE 8',
				'IE 9',
				'IE 10',
				'IE 11'
			],
			cascade: false
		}))
	.pipe(gulp.dest('./dist/styles/'))
	.pipe(browserSync.stream());
});

gulp.task('start', ['sass'], function () {
	 browserSync.init({
        server: "./"
    });

	gulp.watch('./src/styles/**/*.scss', ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});
