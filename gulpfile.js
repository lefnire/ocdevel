var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var imageResize = require('gulp-image-resize');
var del = require('del');
var runSequence = require('run-sequence');

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
  ],
  portfolio: [
    'app/portfolio/*.png'
  ]
};

gulp.task('del', function(){
  return del('dist/**/*');
})

gulp.task('styles', function(){
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'));

});

gulp.task('images', function(){
  gulp.src(paths.portfolio)
    .pipe(imageResize({ 
      width : 350,
      height : 350,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('dist/portfolio'));
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

var steps = ['styles', 'images', 'copy', 'scripts', 'templates'];

gulp.task('default', function() {
  runSequence('del', steps, function(){
    browserSync.init({
        notify: false,
        server: {
            baseDir: "dist"
        }
    });
    steps.forEach(function(s){
      gulp.watch(paths[s], [s])  
    });
    gulp.watch("dist/**/*").on('change', browserSync.reload);
  })
});
