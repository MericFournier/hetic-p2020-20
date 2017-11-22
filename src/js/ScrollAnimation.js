/**
 * Callback from scrollListener
 */
export default class ScrollAnimation {
  constructor(direction) {
    this.sections = document.querySelectorAll('.section')
    this.current_section = document.querySelector('.section--active')
    this.waves = document.querySelector('.waves')
    this.bubbles = document.querySelector('.bubbles')
    this.direction = direction
    this.animation_duration = '1.5'
    this.last_anchor = window.location.hash.substr(1)

    // launch the animation
    this.initAnimation()
  }
  initAnimation() {
    if (this.direction && this.direction.axe === 'y') {
      this.testNextSection()
    }
  }
  testNextSection() {
    this.current = parseInt(this.current_section.getAttribute('data-section'), 10)
    this.next = this.current + this.direction.orientation
    if (this.next >= 0 && this.next < this.sections.length) {
      this.next_section = this.sections[this.next]
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
    this.waves.style.animation = `transitionPage ${this.animation_duration}s cubic-bezier(0.82, 0.24, 0.83, 1.1) reverse`
    this.removeWaveAnimation()
  }
  animeDown() {
    this.waves.style.animation = `transitionPage ${this.animation_duration}s `
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
    if (this.direction.orientation === 1) {
      window.setTimeout(() => {
        this.current_section.classList.remove('section--active')
        this.next_section.classList.add('section--active')
      }, 200)
    }
    else {
      window.setTimeout(() => {
        this.current_section.classList.remove('section--active')
        this.next_section.classList.add('section--active')
      }, 1050)
    }
    this.setAnchor()
  }
  setAnchor() {
    this.next_anchor = this.next_section.getAttribute('data-anchor')
    window.location.hash = this.next_anchor // Anchor in url

    this.setColorPage()
  }
  setColorPage() {
    window.setTimeout(() => {
      // waves
      this.waves.classList.remove(`waves__color--${this.last_anchor}`)
      this.waves.classList.add(`waves__color--${this.next_anchor}`)
    }, 800)

    if(this.direction.orientation === -1)
      window.setTimeout(() => {
        // bubbles
        this.bubbles.classList.remove(`bubbles__color--${this.last_anchor}`)
        this.bubbles.classList.add(`bubbles__color--${this.next_anchor}`)
      }, 1000)
    else
      window.setTimeout(() => {
        // bubbles
        this.bubbles.classList.remove(`bubbles__color--${this.last_anchor}`)
        this.bubbles.classList.add(`bubbles__color--${this.next_anchor}`)
      }, 200)

}
}
