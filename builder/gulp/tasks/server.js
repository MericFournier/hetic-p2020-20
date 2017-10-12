import gulp from 'gulp'
import browserSync from 'browser-sync'
import { bsServer, fonts, icons, images, scripts, styles, views } from '../config'

const bs = browserSync.create()
const reload = bs.reload

const serverTask = () => {
  bs.init(bsServer)
  gulp.watch(fonts.src, ['copy:fonts', reload])
  gulp.watch(icons.src, ['icons', reload])
  gulp.watch(images.src, ['images', reload])
  gulp.watch(scripts.vendorSrc, ['scripts:vendors', reload])
  gulp.watch(scripts.watchSrc, ['jshint', reload])
  gulp.watch(scripts.watchSrc, ['scripts:app', reload])
  gulp.watch(styles.watchSrc, ['styles', reload])
  gulp.watch(views.src, ['views', reload])
}

gulp.task('server', serverTask)

export default serverTask