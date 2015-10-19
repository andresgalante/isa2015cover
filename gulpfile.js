var gulp = require('gulp');
var postcss = require('gulp-postcss');
var plumber = require('gulp-plumber');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function(){
  var processors = [
    autoprefixer({browsers: ['last 1 version']}),
  ];
  
  return gulp.src('sass/isa.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest('css'))
    .pipe(reload({stream:true}));
});

// reload server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('watch', function(){
  gulp.watch('**/*.scss', ['styles'])
  gulp.watch("*.html", ['bs-reload']);
});


gulp.task('default',  ['styles', 'browser-sync','watch']);