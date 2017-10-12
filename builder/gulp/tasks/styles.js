import gulp from 'gulp'
import gutil from 'gulp-util'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cmq from 'gulp-combine-mq'
import cssnano from 'gulp-cssnano'
import sourcemaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import options from 'minimist'
//import browserSync from 'browser-sync'
import { styles } from '../config'

const env = options(process.argv.slice(2)) 
//const bs  = browserSync.create()d

const stylesTask = () => (
  gulp.src(styles.src)
    .pipe(env.production ? gutil.noop() : sourcemaps.init())
    .pipe(plumber({
      errorHandler: notify.onError('SASS ERROR : <%= error.message %>')
    }))
    .pipe(sass())
    .pipe(autoprefixer(styles.autoprefixerOpts))
    .pipe(env.production ? gutil.noop() : sourcemaps.write())
    .pipe(env.production ? cmq() : gutil.noop())
    .pipe(env.production ? cssnano() : gutil.noop())
    .pipe(gulp.dest(styles.dest))
    //.pipe(bs.stream())
)

gulp.task('styles', stylesTask)

export default stylesTask