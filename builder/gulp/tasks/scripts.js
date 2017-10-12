import gulp from 'gulp'
import gutil from 'gulp-util'
import concat from 'gulp-concat'
import plumber from 'gulp-plumber'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import jshint from 'gulp-jshint' 
import notify from 'gulp-notify'
import browserify from 'browserify'
import babelify from 'babelify'
import options from 'minimist'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import { scripts } from '../config'

const env  = options(process.argv.slice(2))

const jshintTask = () => {
  gulp.src([scripts.watchSrc, '!'+scripts.vendorSrc])
    .pipe(jshint('.jshintrc'))
    .pipe(notify(function(file){
      if(file.jshint.success){
        return false
      }

      var errors = file.jshint.results.map(function(data){
        if(data.error){
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason
        }
      }).join('\n')
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors
    }))
}

const vendorsTask = () => (
  gulp.src(scripts.vendorSrc)
    .pipe(concat('vendors.js'))
    .pipe(env.production ? uglify() : gutil.noop())
    .pipe(gulp.dest(scripts.dest))
)

const scriptsTask = () => {
  const bundler = browserify({
    entries: scripts.src,
    debug: env.production ? false : true
  })

  return bundler
    .transform(babelify)
    .bundle()
    .on('error', function(err) {
      console.log(err.toString())
      this.emit("end")
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(env.production ? uglify() : gutil.noop())
    .pipe(gulp.dest(scripts.dest))
}

gulp.task('scripts:vendors', vendorsTask)
gulp.task('scripts:app', scriptsTask)
gulp.task('jshint', jshintTask)

export default {
  vendorsTask,
  scriptsTask,
  jshintTask
}


