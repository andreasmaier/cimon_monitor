var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8888
    });

    gulp.watch("src/**/*.js").on('change', browserSync.reload);
});