var gulp = require('gulp');
var util = require('gulp-util');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var cacheBuster = require('gulp-cache-bust');
var htmlmin = require('gulp-htmlmin');
var plumber = require('gulp-plumber');
var include  = require('gulp-include');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');

var isProduction = util.env.production;

var buildDir = './build';
var cssDir = './css';
var jsDir = './js';
var faviconsDir = './favicons';

gulp.task('styles', function () {
    return gulp.src(cssDir + '/styles.styl')
        .pipe(isProduction ? util.noop() : plumber())
        .pipe(stylus())
        .pipe(isProduction ? autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }) : util.noop())
        .pipe(isProduction ? cleanCSS() : util.noop())
        .pipe(gulp.dest(buildDir));
});

gulp.task('scripts', function () {
    return gulp.src(jsDir + '/site.js')
        .pipe(isProduction ? util.noop() : plumber())
        .pipe(include({
            includePaths: [
                __dirname + "/node_modules"
            ]
        }))
        .pipe(isProduction ? uglify() : util.noop())
        .pipe(gulp.dest(buildDir));
});

gulp.task('html', function() {
    if (isProduction) {
        return gulp.src('index.html')
            .pipe(plumber())
            .pipe(htmlmin({
                collapseWhitespace: true,
                removeComments: true
            }))
            .pipe(cacheBuster())
            .pipe(gulp.dest(buildDir));
    } else {
        return gulp.src('index.html').pipe(gulp.dest(buildDir));
    }
});

gulp.task('favicons', function() {
    return gulp.src(faviconsDir + '/*').pipe(gulp.dest(buildDir))
});

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver());
});

gulp.task('compile', ['styles', 'scripts', 'html']);

if (isProduction) {
    gulp.task('default', ['compile', 'favicons']);
} else {
    gulp.task('default', ['compile', 'favicons', 'webserver'], function () {
        gulp.watch('./css/**/*.styl', ['compile']);
        gulp.watch('./js/*.js', ['compile']);
        gulp.watch('index.html', ['compile']);
    });
}
