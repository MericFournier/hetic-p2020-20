/** Class */
export default class DragDetails {
  /**
   *
   */
  constructor() {
    this.swipeCircle = document.querySelectorAll('.swiper__circle')
    this.begindrag = 0
    this.detectDrag()
  }

  detectDrag() {
    this.swipeCircle.forEach((that) => {
      that.addEventListener('mousedown', (e) => {
        this.begindrag = e.screenX
        console.log('ncfovneroivr')
        window.addEventListener('mousemove', (event) => {
          console.log(event.screenX)
        })
      })
    })
  }
}
