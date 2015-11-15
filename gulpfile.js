var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var paths = {
  styles: [
    'app/style.scss'
  ],
  scripts: [
    // 'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/angular/angular.js',
    'node_modules/angular-ui-router/build/angular-ui-router.js',
    'app/scripts.js'
  ],
  templates: [
    'app/**/*.html'
  ],
  copy: [
    'app/*.jpg'
  ]
};

gulp.task('styles', function(){
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'));

});

gulp.task('copy', function(){
  return Promise.all([
    gulp.src(paths.copy)
      .pipe(gulp.dest('dist')),
    gulp.src('./node_modules/bootstrap/**/*', {base: './'})
      .pipe(gulp.dest('dist'))
  ]);
});

gulp.task('scripts', function(){
  return gulp.src(paths.scripts)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('templates', function(){
  return gulp.src(paths.templates)
    .pipe(gulp.dest('dist'));
})

// Static server
gulp.task('default', ['styles', 'copy', 'scripts', 'templates'], function() {
    browserSync.init({
        notify: true,
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch(paths.copy, ['copy'])
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.templates, ['templates']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch("dist/**/*").on('change', browserSync.reload);
});
