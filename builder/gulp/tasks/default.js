import gulp from 'gulp'
import runSequence from 'run-sequence'

const defaultTask = () => (
  runSequence('copy:fonts', 'icons', 'images', 'styles', 'scripts:vendors', 'scripts:app', 'views', 'server')
)

gulp.task('default', defaultTask)

export default defaultTask