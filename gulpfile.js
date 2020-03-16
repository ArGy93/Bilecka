var gulp        = require('gulp');
var browserSync = require('browser-sync');
var less        = require('gulp-less');

gulp.task('less', function() {
  gulp.src('./src/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('./src/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('server', function() {
  browserSync({
    files: ['src/index.html','src/archive.html','src/product.html'],
    server: {
      baseDir: 'src',
      directory: true
    }
  })
});

gulp.task('watch', ['server'], function() {
  gulp.watch('./src/fonts/*', browserSync.reload);
  gulp.watch('./src/img/*', browserSync.reload);
  gulp.watch('./src/less/**/*.less', ['less']);
  gulp.watch('./src/js/**/*.js', browserSync.reload);
  gulp.watch('./src/*.html', browserSync.reload);
});

gulp.task('build', function() {
  gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./dist/fonts/'));

  gulp.src('./src/img/*')
    .pipe(gulp.dest('./dist/img/'));

  gulp.src('./src/css/*.css')
    .pipe(gulp.dest('./dist/css/'));

  gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js/'));

  gulp.src('./src/modules/**')
    .pipe(gulp.dest('./dist/modules/'));

  gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['watch', 'build']);