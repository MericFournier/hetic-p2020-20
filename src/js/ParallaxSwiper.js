/** Class */
export default class ParallaxSwiper {
  /**
   *
   */
  constructor() {
    this.swipers__circle = document.querySelectorAll('.swiper__circle')
    this.swipers__centerCircle = document.querySelectorAll('.swiper__circle--centerCircle')
    this.circlePosition = this.swipers__circle[0].getBoundingClientRect();
    this.circleSize = this.swipers__circle[0].offsetWidth/2

    this.detectEvent()
  }
  detectEvent() {
    this.swipers__circle.forEach((circle, i) => {
      circle.addEventListener('mousemove', (e) => {
        this.swipers__centerCircle[i].style.transform = `translate3d(${((e.clientX - this.circlePosition.left) - this.circleSize)/10}px, ${((e.clientY - this.circlePosition.top) - this.circleSize)/10}px, 0)`
      })
      circle.addEventListener('mouseleave', (e) => {
        this.swipers__centerCircle[i].style.transform = `translate(0px, 0px)`
      })
    })
  }
  resize() {
    window.addEventListener('resize', () => {
      this.circlePosition = this.swipers__circle[0].getBoundingClientRect();
      this.circleSize = this.swipers__circle[0].offsetWidth/2
    })
  }
}
