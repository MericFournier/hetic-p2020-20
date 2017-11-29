/** Class */
export default class ParallaxSwiper {
  constructor() {
    this.swipers__circle = document.querySelector('.section--active .swiper__circle')
    if (this.swipers__circle) {
      this.swipers__centerCircle = document.querySelector('.section--active .swiper__circle--centerCircle')
      this.circlePosition = this.swipers__circle.getBoundingClientRect()
      this.circleSize = this.swipers__circle.offsetWidth / 2

      this.detectEvent()
      this.resize()
    }
  }
  detectEvent() {
    this.swipers__circle.addEventListener('mousemove', (e) => {
      this.swipers__centerCircle.style.transform = `translate3d(${((e.clientX - this.circlePosition.left) - this.circleSize) / 6}px, ${((e.clientY - this.circlePosition.top) - this.circleSize) / 6}px, 0)`
    })
    this.swipers__circle.addEventListener('mouseleave', (e) => {
      this.swipers__centerCircle.style.transform = 'translate(0px, 0px)'
    })
  }
  resize() {
    window.addEventListener('resize', () => {
      this.circlePosition = this.swipers__circle.getBoundingClientRect()
      this.circleSize = this.swipers__circle.offsetWidth / 2
    })
  }
}
