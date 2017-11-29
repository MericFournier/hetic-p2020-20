/** Class */
export default class GyroscopeBubble {
  /**
   *
   */
  constructor() {
    this.bubble__orientation = document.querySelector('.bubbles__orientation')
    this.ax = 0
    this.ay = 0
    this.az = 0
    this.rotation = 0
    this.arAlpha = 0
    this.arBeta = 0
    this.arGamma = 0
    this.startR = 0
    this.accel = 0.24
    this.decel = 0.75
    this.divider = 2
    this.position = 0
    this.vr = 0
    this.pr = 0
    this.elasticity = 0.9
    this.strength = 0.03
    this.target = 0

    this.testSupport()
  }

  detectMove() {
    window.addEventListener('devicemotion', (e) => {
      this.ax = e.accelerationIncludingGravity.x
      this.ay = e.accelerationIncludingGravity.y
      this.az = e.accelerationIncludingGravity.z
      this.rotation = e.rotationRate
      if (this.rotation != null) {
        this.arAlpha = Math.round(this.rotation.alpha)
        this.arBeta = Math.round(this.rotation.beta)
        this.arGamma = Math.round(this.rotation.gamma)
      }
      this.doOnOrientationChange()
      this.render()
      this.last()
    })
  }

  doOnOrientationChange() {
    switch (window.orientation) {
      case -90:
        this.orientation = 'landscape_clockwise'
        break
      case 90:
        // landscape
        this.orientation = 'landscape_anticlockwise'
        break
      default:
        // portrait
        this.orientation = 'portrait'
        break
    }
  }

  render() {
    // this can be expanded on to take rotating into the "opposite" landscape direction.
    switch (this.orientation) {
      case 'landscape_clockwise':
        this.target = (this.ax * 7)
        break
      case 'landscape_anticlockwise':
        this.target = -(this.ax * 7)
        break

      default:
        this.target = this.ax * 7
    }
  }

  last() {
    this.vr = this.target - this.position
    this.pr = (this.pr * this.elasticity) + (this.vr * this.strength)
    this.position += this.pr

    this.bubble__orientation.style.transform = `rotate( ${this.position}deg)`
  }

  testSupport() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.detectMove()
      this.bubbleSize()
    }
  }

  bubbleSize() {
    if (window.innerWidth < window.innerHeight) {
      document.querySelector('.bubbles').style.width = `${window.innerHeight}px`
    } else {
      document.querySelector('.bubbles').style.height = `${window.innerWidth}px`
    }
  }
}
