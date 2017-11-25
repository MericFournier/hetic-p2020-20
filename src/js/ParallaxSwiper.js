/** Class */
export default class ParallaxSwiper {
  /**
   *
   */
  constructor() {
    this.swipers__circle = document.querySelectorAll('.swiper__circle')
    this.swipers__centerCircle = document.querySelectorAll('.swiper__circle--centerCircle')

    this.detectEvent()
  }
  detectEvent() {
    this.swipers__circle.forEach((circle, i) => {
      circle.addEventListener('mousemove', (e) => {
        this.swipers__centerCircle[i].style.transform = `translate(${(e.layerX - 10) / 5}px, ${(e.layerY - 270) / 5}px)`
      })
      circle.addEventListener('mouseleave', (e) => {
        this.swipers__centerCircle[i].style.transform = `translate(0px, 0px)`
      })
      circle.addEventListener('mousedown', (e) => {
        console.log(`translate(${e.layerX}px, ${e.layerY}px)`)
        this.swipers__centerCircle[i].style.transform = `translate(0px, 0px) !important`
      })
    })
  }
}
