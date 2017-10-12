import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import pngquant from 'imagemin-pngquant'
import { images } from '../config'

const imagesTask = () => {
  images.opts.use = [pngquant()]

  gulp.src(images.src)
    //.pipe(imagemin(images.opts))
    .pipe(gulp.dest(images.dest))
}

gulp.task('images', imagesTask)

export default imagesTask
