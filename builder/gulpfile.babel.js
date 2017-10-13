/* Configurations */
const config = {
    src     : '../src/',
    dist    : '../dist/**',
    page  : {
        src     : '../src/index.html',
        dest    :  '../dist/'
    },
    dist    : '../dist/',
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
    js    : {
        src     : '../src/js/script.js',
        dest    :  '../dist/js'
    },
    server    : '../dist/',
}


/* Dependencies */
import gulp          from 'gulp'
import css_nano      from 'gulp-cssnano'
import rename        from 'gulp-rename'
import plumber       from 'gulp-plumber'
import sass          from 'gulp-sass'
import autoprefixer  from 'gulp-autoprefixer'
import concat        from 'gulp-concat'
import imagemin      from 'gulp-imagemin'
import uglify        from 'gulp-uglify'
import sourcemaps    from 'gulp-sourcemaps'
import browserify    from 'browserify'
import babelify      from 'babelify'
import source        from 'vinyl-source-stream'
import buffer        from 'vinyl-buffer'
import browser_sync  from 'browser-sync'


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
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
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

/* browser-sync */
const browserSync  = () =>{
    browser_sync.init({
        server: config.server,
        notify : false,
	    tunnel : "fanta"
    });
}


/* JS */
// const js = () => {
//     return  browserify(config.js.src,{debug: true})
//             .transform(babelify)
//             .bundle()
//             .pipe(source( config.js.src ))
//             .pipe(buffer())
//             .pipe(sourcemaps.init({loadMaps: true}))
//             .pipe(uglify())
//             .pipe(sourcemaps.write('.'))
//             .pipe(gulp.dest( config.js.dest ))
// }

// const js = () => {
//    const bundler = browserify({
//      entries: config.js.src,
//      debug: true
//    })
//    return bundler
//      .transform(babelify)
//      .bundle()
//      .on('error', function(err) {
//        console.log(err.toString())
//        this.emit("end")
//      })
//      .pipe(source('script.js'))
//      .pipe(buffer())
//      .pipe(sourcemaps.init({loadMaps: true}))
//      .pipe(uglify())
//      .pipe(sourcemaps.write('.'))
//      .pipe(gulp.dest(config.js.dest))
//  }

const reload = (done) => {
    browser_sync.reload();
    done()

}

/* Watch Task */
const watchTask = () => {
    gulp.watch ( config.images.src , gulp.parallel( img, reload ) )
    gulp.watch ( config.sounds.src , gulp.parallel( sound, reload ) )
    gulp.watch ( config.sass.src , gulp.parallel( css, reload ) )
    //gulp.watch ( config.js.src , gulp.series( js ) )
    //gulp.watch ( config.dist , gulp.series(reload) )
}

gulp.task('default', gulp.parallel(pages,img, css, sound, watchTask, browserSync))

// // JS task
// gulp.task( 'js', function()
// {
//     return gulp.src( ['./src/js/*.js'] )        // Get JS files
//         .pipe( concat( 'script.js' ) )     // Concat in one file
//         .pipe( uglify() )                // Minify them (problem with ES6)
//         .pipe( gulp.dest( './dist/js/' ) );     // Put it in folder
// } );
//
//
//
// // Watch task
// gulp.task( 'watch', function()
// {
//     gulp.watch( './src/scss/**/**', [ 'sass' ] );
//     gulp.watch( './src/js/**/**', [ 'js' ] );
//     gulp.watch( './src/**/*.php', [ 'php' ] );
//     gulp.watch( './src/img/**/**', [ 'img' ] );
//     gulp.watch( './src/sounds/**/**', [ 'sounds' ] );
// } );
//
//
//
// gulp.task( 'default', [ 'php', 'sass', 'js', 'img', 'sounds', 'watch' ] );
