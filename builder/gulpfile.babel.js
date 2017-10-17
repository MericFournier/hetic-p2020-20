'use strict';

/* Configurations */
const config = {
    src     : '../src/',
    dist    : '../dist/',
    page    : {
        src     : '../src/*.php',
        dest    :  '../dist/'
    },
    images  : {
        src     : '../src/img/**',
        dest    :  '../dist/img/'
    },
    sounds  : {
        src     : '../src/sounds/**',
        dest    :  '../dist/sounds/'
    },
    sass    : {
        src     : '../src/scss/**/**.scss',
        dest    :  '../dist/css'
    },
    js      : {
        src     : '../src/js/',
        app     : '../src/js/app.js',
        dest    :  '../dist/js'
    },
    server  : '../dist/',
}


/* Dependencies */
import gulp          from 'gulp'
import css_nano      from 'gulp-cssnano'
import rename        from 'gulp-rename'
import sass          from 'gulp-sass'
import autoprefixer  from 'gulp-autoprefixer'
import concat        from 'gulp-concat'
import imagemin      from 'gulp-imagemin'
import uglify        from 'gulp-uglify'
import sourcemaps    from 'gulp-sourcemaps'
import browserify    from 'browserify'
import babelify      from 'babelify'
import babel         from 'gulp-babel'
import source        from 'vinyl-source-stream'
import buffer        from 'vinyl-buffer'
import browser_sync  from 'browser-sync'
import plumber       from 'gulp-plumber'
import gulp_notify   from 'gulp-notify'
import connect       from 'gulp-connect-php'

var onError = function (err) {
    gulp_notify({
         title      : 'Error',
         message    : err.message
     }).write(err);

     console.log(err.toString())

     this.emit('end');
}

/* Vues */
const pages = () => {
    return  gulp.src( [ config.page.src] )
            .pipe(gulp.dest(config.page.dest))
 }

/* Images*/
const img = () => {
    return  gulp.src( [ config.images.src ] )
            .pipe(imagemin())
            .pipe(gulp.dest( config.images.dest ));
}

/*  Sounds */
const sound = () =>{
    return  gulp.src( [ config.sounds.src ] )
            .pipe(gulp.dest( config.sounds.dest ));
}

/* SASS */
const css = () => {
    return  gulp.src( [ config.sass.src ] )
            .pipe(plumber({ errorHandler: onError }))
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(rename(function (path) {
                path.basename += '.min';
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest( config.sass.dest ))
}

/* Browser-sync */
const server  = () =>{
    console.log(config.dist)
    connect.server({
        base     : config.server,
    });
   browser_sync.init({
       proxy  : '127.0.0.1:8000',
       notify  : false,
       tunnel  : "fanta",
       scroll: false,
   });
}


/* JS */
const js = () => {
    return  browserify({
                entries : config.js.app,
                debug   : true
            })
            .transform(babelify, {"presets": ['babel-preset-es2015'].map(require.resolve)})
            .bundle()
            .on('error', onError)
            .pipe(source( 'app.js' ))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(plumber({ errorHandler: onError }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest( config.js.dest ))
}

/* Reload Page */
const reload = (done) => {
    browser_sync.reload();
    done()

}

/* Watch Task */
const watchTask = () => {
    gulp.watch ( config.images.src  , gulp.parallel( img, reload ) )
    gulp.watch ( config.sounds.src  , gulp.parallel( sound, reload ) )
    gulp.watch ( config.sass.src    , gulp.parallel( css, reload ) )
    gulp.watch ( config.js.src      , gulp.parallel( js, reload ) )
    gulp.watch ( config.page.src    , gulp.parallel( pages, reload) )
}

gulp.task('run', gulp.parallel(pages,img, js , css, sound, watchTask, server))
gulp.task('default', gulp.parallel(pages,img, js , css, sound))
