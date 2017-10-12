import gulp from 'gulp'
import preprocess from 'gulp-preprocess'
import { views } from '../config'

const viewsTask = () => (
  gulp.src(views.src)
  	.pipe(preprocess({context: {}}))
    .pipe(gulp.dest(views.dest))
)

gulp.task('views', viewsTask)

export default viewsTask