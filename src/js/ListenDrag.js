import Draggable from 'Draggable'
/** Class */
export default class ListenDrag {
  /**
   * Class that create a drag section to show the botles
   */
  constructor() {
    this.element = document.querySelectorAll('.swiper__circle')
    this.option = {
      grid: 400,
      limit: {
        x: [1, 200, ],
        y: [-5, 5, ],
      },
      smoothDrag: true,
      onDrag: (drag, e) => {
        this.callbackDrag(e)
      },
    }
    this.close = document.querySelectorAll('.bottle__bioClose')

    this.initListener()
  }
  initListener() {
    this.element.forEach((that) => {
      new Draggable(that, this.option)
    })
  }
  callbackDrag(e) {
    if (e > 170) {
      document.querySelector('.section--active').classList.add('section--detailActive')

      this.closeDetail()
    }
  }
  closeDetail() {
    this.close.forEach((that) => {
      that.addEventListener('click', () => {
        ListenDrag.close()
      })
    })
  }
  static close() {
    document.querySelector('.section--detailActive .swiper__circle').style.top = 0
    document.querySelector('.section--detailActive .swiper__circle').style.left = 0

    document.querySelector('.section--detailActive').classList.remove('section--detailActive')

  }
}
