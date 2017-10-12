import gulp from 'gulp'
import svgSprite from 'gulp-svg-sprite'
import { icons } from '../config'

const iconsTask = () => (
  gulp.src(icons.src)
    .pipe(svgSprite(icons.spriteConfig))
    .pipe(gulp.dest(icons.dest))
)

gulp.task('icons', iconsTask)

export default iconsTask