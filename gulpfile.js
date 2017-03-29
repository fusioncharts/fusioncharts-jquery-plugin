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
var header = require('gulp-header');
var path = require('path');
// var minifyCSS = require('gulp-minify-css');

var pkgJSON = JSON.parse(require('fs').readFileSync('./package.json'));

var BANNER = `
/**!
 * @license FusionCharts JavaScript Library jQuery Plugin v<%= version %>
 * Copyright FusionCharts Technologies LLP
 * License Information at <http://www.fusioncharts.com/license>
 *
 * @author FusionCharts Technologies LLP
 */

`;


// Build task
gulp.task('clean:dist', function () {
    return del([pkgJSON.build.dist]);
});

gulp.task('create:dist', ['clean:dist'], function () {

    var standalone = browserify(pkgJSON.src + '/' + pkgJSON.name, {
        standalone: pkgJSON.name
    })
    .transform(babelify.configure({
        // presets: ["es2015"]
    }))
    .transform(shim);

    for (var pkg in pkgJSON.dependencies) {
        standalone.exclude(pkg);
    }

    return standalone.bundle()
        .on('error', function (e) {
            gutil.log('Browserify Error', e);
        })
        .pipe(source(pkgJSON.build.name + '.js'))
        .pipe(header(BANNER, pkgJSON ))
        .pipe(gulp.dest(pkgJSON.build.dist))
        .pipe(rename(pkgJSON.build.name + '.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(pkgJSON.build.dist));
});

gulp.task('clean:lib', function () {
    return del([pkgJSON.lib]);
});


gulp.task('create:lib', ['clean:lib'], function () {
    return gulp.src([ pkgJSON.src  + '/**/*.js' ])
        .pipe(babel({
        }))
        .pipe(gulp.dest(pkgJSON.lib));
});


gulp.task('watch', ['create:lib'], function () {
    return gulp.watch([pkgJSON.src + '/**/*.js'], ['create:lib']);
});


// Web server task
gulp.task('start:server', function () {
    connect.server({
        root: pkgJSON.samples.root,
        fallback: path.join(pkgJSON.samples.root + '/' + pkgJSON.samples.dist, 'index.html'),
        port: pkgJSON.samples.port || process.env.PORT || 8000,
        livereload: true
    });
    // Reload the browser
    return connect.reload();

});

gulp.task('copy:html', function () {
    return gulp.src([ pkgJSON.samples.root + '/' + pkgJSON.samples.src + '/index.html' ])
        .pipe(gulp.dest(pkgJSON.samples.root + '/' + pkgJSON.samples.dist));
});


gulp.task('build:sample', ['create:lib', 'copy:html'], function () {
    var standalone = browserify(pkgJSON.samples.root + '/' + pkgJSON.samples.src + '/index.js')
			.transform(babelify.configure());

    return standalone.bundle()
        .on('error', function (e) {
            gutil.log('Browserify Error', e);
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(pkgJSON.samples.root + '/' + pkgJSON.samples.dist))
        .pipe(connect.reload());
});

gulp.task('watch', ['create:dist', 'create:lib', 'build:sample'], function () {
    // Watch source file to create build and lib
    gulp.watch(['./samples/src/*.js'], ['build:sample']);

    gulp.watch(['./samples/src/*.html'], ['build:sample']);

    gulp.watch([pkgJSON.src + '/**/*.js'], ['create:dist', 'create:lib', 'build:sample']);

});

gulp.task('build', [ 'create:dist', 'create:lib' ]);

gulp.task('start', ['start:server', 'watch']);

