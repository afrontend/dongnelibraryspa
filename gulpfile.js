/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var fs = require('fs');
var gulp = require('gulp');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
/*
 * fs.readdirSync('./gulp').filter(function(file) {
 *   return (/\.(js|coffee)$/i).test(file);
 * }).map(function(file) {
 *   require('./gulp/' + file);
 * });
 */


var gulpfiles = [
 './gulp/styles.js',
 './gulp/scripts.js',
 './gulp/inject.js',
 './gulp/build.js',
 './gulp/conf.js',
 './gulp/watch.js',
 './gulp/server.js',
 './gulp/e2e-tests.js',
 './gulp/unit-tests.js',
];

gulpfiles.forEach(function (file) {
  require(file);
})

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', gulp.series('clean', function () {
  gulp.start('build');
}));
