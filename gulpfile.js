var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

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

gulp.task('scripts', function(){
  return gulp.src([ // The order that you list the files in this array IS IMPORTANT!!
      'src/scripts/main.js',
    ])
  .pipe(concat('scripts.min.js')) // concatenates the JS files listed above into one file called scripts.min.js
  .pipe(uglify()) // minifies scripts.min.js
  .pipe(gulp.dest('dist/scripts/')) // tells task which directory to outputs uglified (minified) scripts.min.js
});

gulp.task('start', ['sass'], function () {
	 browserSync.init({
        server: "./"
    });

	gulp.watch('./src/styles/**/*.scss', ['sass']);
	gulp.watch('src/scripts/**.js', ['scripts']); // Watch the JS files for changes
    gulp.watch("./*.html").on('change', browserSync.reload);
});
