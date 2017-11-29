import Draggable from 'Draggable'
/** Class */
export default class ListenDrag {
  /**
   *
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
    this.close = document.querySelector('.bottle__bioClose')
    this.close.addEventListener('click', () => {
      ListenDrag.close()
    })
  }
  static close() {
    document.querySelector('.section--detailActive').classList.remove('section--detailActive')

    document.querySelector('.swiper__circle').style.top = 0
    document.querySelector('.swiper__circle').style.left = 0
  }
}
