var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');

var path = {
  HTML: 'src/index.html',
  LESS: 'src/less/*.less',
  MINIFIED_OUT: 'build.min.js',
  MINIFIED_OUT_CSS: 'app.css',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js'
};

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('less:dev', function(){
  return gulp.src(path.LESS)
    .pipe(less())
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('less:prod', function(){
  return gulp.src(path.LESS)
    .pipe(less())
    .pipe(cssmin())
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('watch', function() {

  gulp.watch(path.HTML, ['copy']);
  gulp.watch(path.LESS, ['less:dev']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }).require('react', { exports: 'react' }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT,
      'css': 'build/' + path.MINIFIED_OUT_CSS
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'less:prod', 'build']);

gulp.task('default', ['copy', 'less:dev', 'watch']);
