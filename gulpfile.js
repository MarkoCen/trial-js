var gulp = require('gulp');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('default', function () {

    var pkg = require('./package.json');

    return gulp.src('./trial.js')
        .pipe(uglify())
        .pipe(header(
            [
                '/**',
                '* <%= pkg.name %> - <%= pkg.description %>',
                '* @author <%= pkg.author %>',
                '* @version v<%= pkg.version %>',
                '* @link <%= pkg.homepage %>',
                '* @license <%= pkg.license %>',
                '*/'
            ].join('\n'),
            {pkg: pkg}
        ))
        .pipe(rename('trial.min.js'))
        .pipe(gulp.dest('./'))

});

gulp.watch(['./trial.js'], ['default'], function () {
    console.log('rebuild done')
});