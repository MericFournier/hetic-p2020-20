/**
 * Callback from scrollListener
 */
export default class ScrollAnimation {
  constructor() {
    this.sections = document.querySelectorAll('.section')
    this.current_section = document.querySelector('.section--active')
    this.waves = document.querySelector('.waves')
    this.bubbles = document.querySelector('.bubbles')
    this.animation_duration = '1.5'
    this.last_anchor = window.location.hash.substr(1)
  }
  initAnimation(direction) {
    this.direction = direction
    console.log(this.direction)

    this.checkCorrectMove()
    // if ('ontouchstart' in window) {
    //   window.addEventListener('touchstart', (e) => {
    //     if (e.srcElement !== document.querySelector('swiper__circle')) {
    //     this.checkCorrectMove()
    //     }
    //   })
    // } else {
    // this.checkCorrectMove()
    // }
  }

  checkCorrectMove() {
    if (this.direction && this.direction.axe === 'y') {
      this.animate()
    }
  }

  animate() {
    this.next = parseInt(this.current_section.getAttribute('data-section'), 10) + this.direction.orientation
    if (this.next >= 0 && this.next < this.sections.length) {
      this.directionWaves()
    }
  }

  directionWaves() {
    if (this.direction.orientation === 1) {
      this.animeDown()
    } else {
      this.animeUp()
    }
  }

  animeUp() {
    this.waves.style.animation = `transitionPage ${this.animation_duration}s cubic-bezier(.79,.03,.98,.74) reverse`
    this.removeWaveAnimation()
  }

  animeDown() {
    this.waves.style.animation = `transitionPage ${this.animation_duration}s cubic-bezier(.23,.42,.27,.98)`
    this.removeWaveAnimation()
  }

  removeWaveAnimation() {
    const timerEnd = this.animation_duration * 1000
    window.setTimeout(() => {
      this.waves.style.animation = ''
    }, timerEnd)
    this.changeSection()
  }

  changeSection() {
    this.sectionTimer = this.direction.orientation === -1 ? 800 : 200
    window.setTimeout(() => {
      this.current_section.classList.remove('section--active')
      this.last_anchor = this.current_section.getAttribute('data-anchor')

      // set the new current
      this.current_section = this.sections[this.next]
      this.current_section.classList.add('section--active')
      this.new_anchor = this.current_section.getAttribute('data-anchor')
    }, this.sectionTimer)

    this.last_anchor = this.current_section.getAttribute('data-anchor')
    this.new_anchor = this.sections[this.next].getAttribute('data-anchor')
    this.setAnchor()
    this.setColorPage()
  }

  setAnchor() {
    window.location.hash = this.new_anchor // Anchor in url
  }

  setColorPage() {
    this.wavesTimer = this.direction.orientation === -1 ? 700 : 1000
    window.setTimeout(() => {
      // waves
      this.waves.classList.remove(`waves__color--${this.last_anchor}`)
      this.waves.classList.add(`waves__color--${this.new_anchor}`)
    }, this.wavesTimer)

    if (this.direction.orientation === -1) {
      window.setTimeout(() => {
        // bubbles
        this.bubbles.classList.remove(`bubbles__color--${this.last_anchor}`)
        this.bubbles.classList.add(`bubbles__color--${this.new_anchor}`)
      }, 1100)
    } else {
      window.setTimeout(() => {
        // bubbles
        this.bubbles.classList.remove(`bubbles__color--${this.last_anchor}`)
        this.bubbles.classList.add(`bubbles__color--${this.new_anchor}`)
      }, 200)
    }
  }
}
