'use strict'

let packageJson = require('./package.json')
let version = packageJson.version


var gulp = require('gulp')
var webpack = require('webpack-stream')
<<<<<<< HEAD
var mocha = require('gulp-mocha')   // For unit test
var babel = require('gulp-babel')   // For turn ES6 into ES5
=======
var mocha = require('gulp-mocha')   // unit testing
var babel = require('gulp-babel')   // conversation to ES6 from ES5
>>>>>>> origin/2.0
// var browserify = require('browserify');
// var source = require('vinyl-source-stream');
// var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var gutil = require('gulp-util')
var es2015 = require('babel-preset-es2015');

// websdk-{version}.js
gulp.task('sdk:umd', function () {
    return gulp.src('./index.js')
        .pipe(webpack({
                output: {
                    filename: 'websdk-' + version + '.js',
                    library: 'WebIM',
                    libraryTarget: 'umd'
                }
            })
        )
        .pipe(gulp.dest('dist/'))
})

// websdk-{version}.min.js
// websdk-{version}.min.js.map
gulp.task('sdk:umd:min', ['sdk:umd'], function () {
    return gulp.src('./dist/websdk-' + version + '.js')
        .pipe(babel({
            presets: [es2015]
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(rename('websdk-' + version + '.min.js'))
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'))
})

gulp.task('sdk', ['sdk:umd', 'sdk:umd:min'])

gulp.task('default', ['sdk'])

<<<<<<< HEAD
=======
//
// gulp.task('watch', function() {
//     livereload.listen(); // use listen() method
//     gulp.watch('less/*.less', ['less']);
// });
>>>>>>> origin/2.0
