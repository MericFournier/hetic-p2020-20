import Draggable from './draggable'

/** Class */
export default class ListenDrag {
  /**
   *
   */
  constructor() {
    this.element = document.querySelectorAll('.swiper__circle')
    this.option = {
      grid: 200,
      limit: {
        x: [1, 200],
        y: [-5, 5],
      },
      smoothDrag: true,
      onDrag: (drag, e) => {
        this.callbackDrag(e)
      }
    }

    this.initListener()
  }
  initListener() {
    this.element.forEach((that) => {
      console.log(that)
      new Draggable(that, this.option)
    })
  }
  callbackDrag(e) {
    if (e > 150) {
      document.querySelector('.section--active').classList.add('section--detailActive')
    }
  }
}
