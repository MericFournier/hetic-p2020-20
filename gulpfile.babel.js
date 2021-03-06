/* Dependencies */
import gulp          from 'gulp'
import rename        from 'gulp-rename'
import sass          from 'gulp-sass'
import autoprefixer  from 'gulp-autoprefixer'
import imagemin      from 'gulp-imagemin'
import uglify        from 'gulp-uglify'
import sourcemaps    from 'gulp-sourcemaps'
import browserify    from 'browserify'
import babelify      from 'babelify'
import source        from 'vinyl-source-stream'
import buffer        from 'vinyl-buffer'
import browser_sync  from 'browser-sync'
import plumber       from 'gulp-plumber'
import gulp_notify   from 'gulp-notify'
import connect       from 'gulp-connect-php'
import srcset        from 'gulp-srcset'
import sugar_srcset  from 'gulp-sugar-srcset'


'use strict'

/* Configurations */
const config = {
    src     : 'src/',
    dist    : 'dist/',
    page    : {
        src     : 'src/*.html',
        dest    :  'dist/'
    },
    images  : {
        src     : 'src/img/**',
        dest    :  'dist/img/'
    },
    sounds  : {
        src     : 'src/sounds/**',
        dest    :  'dist/sounds/'
    },
    sass    : {
        src     : 'src/scss/**/**.scss',
        dest    :  'dist/css'
    },
    js      : {
        src     : 'src/js/',
        app     : 'src/js/app.js',
        dest    :  'dist/js'
    },
    fonts   : {
        src     : 'src/fonts/**',
        dest    :  'dist/fonts'
    },
    htaccess   : {
        src     : 'src/.htaccess',
        dest    :  'dist/',
    },
    server  : 'dist/',
}


/* htaccess */
const htaccess = () => gulp.src([config.htaccess.src])
    .pipe(gulp.dest(config.htaccess.dest))


var onError = function (err) {
    gulp_notify({
         title      : 'Error',
         message    : err.message
     }).write(err)

     console.log(err.toString())

     this.emit('end')
}

/* Vues */
const pages = () => {
    return  gulp.src( [ config.page.src] )
        .pipe(sugar_srcset({
            responsive : {suffix :'@[match]w'}
        }))
        .pipe(gulp.dest(config.page.dest))
}


/* Images*/
const img = () => {
    return  gulp.src( [ config.images.src ] )
            .pipe(imagemin())
            .pipe(srcset([{
                width:  [1, 1920, 1280, 720, 560, 320],
            }]))
            .pipe(gulp.dest( config.images.dest ))
}


/* Fonts */
const fonts = () => {
    return  gulp.src( [ config.fonts.src] )
            .pipe(gulp.dest(config.fonts.dest))
 }


/*  Sounds */
const sound = () =>{
    return  gulp.src( [ config.sounds.src ] )
            .pipe(gulp.dest( config.sounds.dest ))
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
                path.basename += '.min'
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest( config.sass.dest ))
}

/* Browser-sync */
const server  = () =>{
    console.log(config.dist)
    connect.server({
        base     : config.server,
    })
   browser_sync.init({
       proxy  : '127.0.0.1:8000',
       notify  : false,
       tunnel  : "fanta",
       scroll: false,
   })
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
    browser_sync.reload()
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

gulp.task('run', gulp.parallel(htaccess, pages, img, js , css, sound, fonts, watchTask, server))
gulp.task('default', gulp.parallel(htaccess, pages, img, js , css, fonts, sound))
