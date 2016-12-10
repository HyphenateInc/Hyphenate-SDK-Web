var gulp = require('gulp');
var mocha = require('gulp-mocha');   // For unit test
var babel = require("gulp-babel");   // For turn ES5 into ES6
var uglify = require('gulp-uglify'); // For Compress JS files

// Turn ES5 into ES6
// Type gulp toes5 on terminal to start this task
gulp.task("toes5", function () {
    return gulp.src("demo/javascript/dist/demo.js")// Path for ES6 source
        .pipe(babel())
        .pipe(gulp.dest("demo/javascript/dist2")); //Turn into path for ES5
});

// Compress JS files
// Type gulp script on terminal to start this task
gulp.task('min', function () {
    // 1. Find the file
    gulp.src('demo/javascript/dist2/demo.js')
        // 2. Compress the file
        .pipe(uglify())
        // 3. Save as compressed file
        .pipe(gulp.dest('demo/javascript/dist2_min'))
});

// Watch task automaticly
// Type gulp auto on terminal to start this task
gulp.task('auto', function () {
    // Watch changement of files, execute script task when file was changed
    gulp.watch('demo/javascript/dist/demo.js', ['toes5']);
    gulp.watch('demo/javascript/dist2/demo.js', ['min']);

});

//Unit test
gulp.task('test', function () {

    return gulp.src('demo/javascript/src/test.js')
        .pipe(mocha())
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });
});
