/** Class that gonna listen scroll on desktop or mobile. */

export default class ScrollListener {
  /**
     * @callback callback
     * @param callback
     * @param {int} delay
     * @param {boolean} keyboardNavigation
     */
  constructor(callback, delay = 1500, keyboardNavigation = false) {
    this.delay = delay
    this.keyboardNavigation = keyboardNavigation
    this.event_timeStamp = -+this.delay
    this.callback = callback

    // begin the listener
    this.listenScroll()
  }

  listenScroll() {
    // Test tactile device
    if ('ontouchstart' in window) {
      this.mobileListener()
    }
    this.desktopListener()
  }

  /**
     * Active listener on mobile
     */
  mobileListener() {
    // iphone block scroll
    window.addEventListener('scroll', (e) => {
      e.preventDefault()
      window.scroll(0, 0)
    })
    window.addEventListener('touchmove', (e) => {
      e.preventDefault()
    })

    // Homemade scroll listener
    const touch = {}
    const direction = {}

    document.addEventListener('touchstart', (e) => {
      touch.start = parseInt(e.changedTouches[0].pageY, 10)
    })

    document.addEventListener('touchend', (e) => {
      touch.end = parseInt(e.changedTouches[0].pageY, 10)
      if (touch.start - 5 > touch.end) {
        direction.axe = 'y'
        direction.orientation = parseInt(1, 10)
      } else if (touch.start + 5 < touch.end) {
        direction.axe = 'y'
        direction.orientation = parseInt(-1, 10)
      }
      this.callback(direction)
    })
  }

  /**
     * Active listener on desktop
     */
  desktopListener() {
    // Wheel (scroll)
    window.addEventListener('wheel', (e) => {
      if (e.timeStamp > (this.event_timeStamp + this.delay)) {
        this.event_timeStamp = e.timeStamp
        this.callback(this.getWheelDirection(e))
      }
    })

    // Keyboard
    if (this.keyboardNavigation) {
      window.addEventListener('keydown', (e) => {
        this.keyboardAction(e)
      })
    }
  }

  /**
     * Function that gonna return the direction of the wheel for the desktop
     * @param {event} e - The wheel event
     * @returns {boolean} return false if delay is less than this.delay
     */
  getWheelDirection(e) {
    /* const deltaX = Math.max(-1, Math.min(1, (e.deltaX))) // Get scroll X */
    const deltaY = Math.max(-1, Math.min(1, (e.deltaY))) // Get scroll Y

    // Get wheel event only every 1.5 second
    if (deltaY !== 0) {
      let direction
      if (deltaY > 0) {
        direction = ScrollListener.next()
      } else {
        direction = ScrollListener.previous()
      }
      return direction
    }
    return false
  }

  /**
     * Function that interpreter the keydown event
     * @param {event} e - The Keydown event
     */
  keyboardAction(e) {
    // Down
    if (e.keyCode === 40) this.callback(ScrollListener.next())
    // Up
    else if (e.keyCode === 38) this.callback(ScrollListener.previous())
  }

  /**
     * Function for the previous action
     */
  static previous() {
    const direction = {}
    direction.axe = 'y'
    direction.orientation = parseInt(-1, 10)
    return direction
  }

  /**
     * Function called for the next action
     */
  static next() {
    const direction = {}
    direction.axe = 'y'
    direction.orientation = parseInt(1, 10)
    return direction
  }
}
