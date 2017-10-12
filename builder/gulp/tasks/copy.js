import gulp from 'gulp'
import { fonts } from '../config'

const copyFonts = () => (
  gulp.src(fonts.src)
    .pipe(gulp.dest(fonts.dest))
)

gulp.task('copy:fonts', copyFonts)

export default copyFonts