var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
