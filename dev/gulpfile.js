// kreisvier Gulp Setup with browser sync & php
// (c) 2018 kreisvier communications ag, Mischa Sprecher
//

var gulp        = require('gulp');
var connectPHP  = require('gulp-connect-php');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// SASS CSS Task
gulp.task('sass', function(){
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        '../src/scss/*.scss'
    ])
    .pipe(sass())
    .pipe(gulp.dest("../web/css"))
    .pipe(browserSync.stream());
});

// PHP Task
gulp.task('php', function() {
    connectPHP.server({
        base: "../web",
        port: 8010,
        hostname:"127.0.0.1",
        keepalive: true
    });
});

// BrowserSync Task
gulp.task('browser-sync',['php'], function() {
    browserSync.init({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false
    });
});

// Javascript Task
gulp.task('js', function(){
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        '../src/js/*.js'
    ])
    .pipe(gulp.dest("../web/js"))
    .pipe(browserSync.stream());
});


// Default task starts php, browsersync and js copy task and also adds three watchers
// to reload the browser automatically on Change (and if needed calling sass, which
// compiles and moves the scss and reloads the browser itself)
gulp.task('default', ['php','browser-sync','js'], function () {
    gulp.watch("../templates/*.html").on('change', browserSync.reload);
    gulp.watch("../templates/*.php").on('change', browserSync.reload);
    gulp.watch([
        'node_modules/bootstrap/scss/bootstrap.scss',
        '../src/scss/*.scss'
    ], ['sass']);
});
