/**
 * Created by ponomarev-iv on 02.02.2017.
 */
'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    newer = require('gulp-newer'),
    size = require('gulp-size');

var path = {
    build: {
        css: 'assets/',
        img: 'img/',
        js: 'assets/js/',
        base: '',
        html: '_site/'
    },
    src: {
        style: '_dev/scss/all.scss',
        scss: '_dev/scss/',
        img: '_dev/img/*.*',
        js: '_dev/js/*.js'
    },
    watch: {
        style: '_dev/scss/**/*.scss',
        img: '_dev/img/*.*',
        js: '_dev/js/*'
    }
};

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sass({
            errLogToConsole: true
        }))
        .on('error', console.log)
        .pipe(prefixer('last 4 versions'))
        .pipe(csso())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(newer(path.build.img))
        .pipe(imagemin())
        .on('error', console.log)
        .pipe(gulp.dest(path.build.img));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('build', [
    'style:build',
    'image:build',
    'js:build'
]);

gulp.task('watch', function(){
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('default', ['build', 'watch']);