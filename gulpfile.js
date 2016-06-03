var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('server', ['sass'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8888
    });

    gulp.watch("src/**/*.scss", ['sass']);
    gulp.watch(["src/**/*.js", "src/**/*.html"]).on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('src/cimon.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});