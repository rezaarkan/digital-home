const gulp = require('gulp'),
  $ = require('gulp-load-plugins')();

var assetsSrcPath = '_assets/',
    assetsDestPath = '_site/dist/assets',
    cssSrcPath = '_sass/',
    cssSrcName = 'main.scss',
    cssDestPath = '_site/dist',
    jsSrcPath = '_scripts/**/*.js',
    jsDestPath = '_site/dist/',
    jsDestName = 'script.js';

const assets = function(){
  return gulp.src(assetsSrcPath + '**')
    .pipe(gulp.dest(assetsDestPath));
}

const css = function(){
  return gulp.src(cssSrcPath + cssSrcName)
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      cascade: false
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(cssDestPath));
}

const js = function(){
  return gulp.src(jsSrcPath)
    .pipe($.concat(jsDestName))
    .pipe(gulp.dest(jsDestPath))
}

const jsbuild = function(){
  return gulp.src(jsSrcPath)
    .pipe($.concat(jsDestName))
    .pipe($.uglify())
    .pipe(gulp.dest(jsDestPath))
}

const watch = function(){
  gulp.watch(cssSrcPath + '**/*.scss', gulp.parallel(css, js));
}

exports.assets = assets;
exports.css = css;
exports.js = js;
exports.watch = watch;
exports.build = gulp.parallel(assets, css, jsbuild);
