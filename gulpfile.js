// Gulp Dependencies
var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var del = require('del');
var gutil = require('gulp-util');
// var less = require('gulp-less');
var rename = require('gulp-rename');
var shim = require('browserify-shim');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var connect = require('gulp-connect');
var path = require('path');
// var minifyCSS = require('gulp-minify-css');

var pkgJSON = JSON.parse(require('fs').readFileSync('./package.json'));

// Build task
gulp.task('clean:dist', function () {
    return del([pkgJSON.build]);
});

gulp.task('dist', ['clean:dist'], function () {

    var standalone = browserify(pkgJSON.src + '/' + pkgJSON.name, {
        standalone: pkgJSON.name
    })
    .transform(babelify.configure({
        // plugins: [require('babel-plugin-object-assign')]
    }))
    .transform(shim);

    for (var pkg in pkgJSON.dependencies) {
        standalone.exclude(pkg);
    }

    // pkgJSON.dependencies.forEach(function (pkg) {
    //     standalone.exclude(pkg);
    // });

    return standalone.bundle()
        .on('error', function (e) {
            gutil.log('Browserify Error', e);
        })
        .pipe(source(pkgJSON.name + '.js'))
        .pipe(gulp.dest(pkgJSON.build))
        .pipe(rename(pkgJSON.name + '.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(pkgJSON.build));
});

gulp.task('clean:lib', function () {
    return del([pkgJSON.lib]);
});

gulp.task('lib', ['clean:lib'], function () {
    return gulp.src([ pkgJSON.src  + '/**/*.js' ])
        .pipe(babel({
        }))
        .pipe(gulp.dest(pkgJSON.lib));
});


gulp.task('watch', ['lib'], function () {
    return gulp.watch([pkgJSON.src + '/**/*.js'], ['lib']);
});

gulp.task('build', [ 'dist', 'lib' ]);



// Web server task
gulp.task('start:server', function () {
    connect.server({
        root: pkgJSON.samples.root,
        fallback: path.join(pkgJSON.samples.root + '/' + pkgJSON.samples.dist, 'index.html'),
        port: pkgJSON.samples.port || process.env.PORT || 8000,
        livereload: true
    });
});

gulp.task('copy:html', function () {
    return gulp.src([ pkgJSON.samples.root + '/' + pkgJSON.samples.src + '/index.html' ])
        .pipe(gulp.dest(pkgJSON.samples.root + '/' + pkgJSON.samples.dist));    
});

gulp.task('build:sample', ['lib'], function () {
    var standalone = browserify(pkgJSON.samples.root + '/' + pkgJSON.samples.src + '/index.js')
    .transform(babelify.configure());

    return standalone.bundle()
        .on('error', function (e) {
            gutil.log('Browserify Error', e);
        })

        .pipe(source('bundle.js'))
        .pipe(gulp.dest(pkgJSON.samples.root + '/' + pkgJSON.samples.dist))

        // .pipe(rename('bundle.min.js'))
        // .pipe(streamify(uglify()))
        // .pipe(gulp.dest(pkgJSON.samples.root + '/' + pkgJSON.samples.dist))

        .pipe(connect.reload());
});


gulp.task('watch:samples', ['build:sample'], function () {
    return gulp.watch([pkgJSON.samples.root + '/' + pkgJSON.samples.src + '/index.js'], ['build:sample']);
});

gulp.task('watch:lib', ['lib'], function () {
    return gulp.watch([pkgJSON.src + '/**/*.js'], ['lib', 'build:sample']);
});

gulp.task('watch:build', ['dist'], function () {
    return gulp.watch([pkgJSON.src + '/**/*.js'], ['dist']);
});


gulp.task('start', ['start:server', 'watch:samples', 'watch:lib']);


