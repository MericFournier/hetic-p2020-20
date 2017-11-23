/** Class that gonna listen scroll on desktop or mobile. */

export default class ScrollListener {
  /**
     * @callback callback
     * @param callback
     * @param {int} delay
     * @param {boolean} keyboardNavigation
     * @param {Obj} The parent of th
     */
  constructor(callback, delay = 1500, keyboardNavigation = false, objParent) {
    this.delay = delay
    this.keyboardNavigation = keyboardNavigation
    this.event_timeStamp = -+this.delay
    this.callback = callback.bind(objParent)

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
    // Homemade scroll listener
    const touch = {}
    const direction = {}

    document.addEventListener('touchstart', (e) => {
      if (e.srcElement !== document.querySelector('.swiper__circle')) {
        touch.start = parseInt(e.changedTouches[0].pageY, 10)
      } else {
        touch.start = null
      }
    })
    document.addEventListener('touchend', (e) => {
      if (touch.start !== null) {
        touch.end = parseInt(e.changedTouches[0].pageY, 10)
        if (touch.start - 5 > touch.end) {
          direction.axe = 'y'
          direction.orientation = parseInt(1, 10)
        } else if (touch.start + 5 < touch.end) {
          direction.axe = 'y'
          direction.orientation = parseInt(-1, 10)
        }
        this.callback(direction)
      }
    })
  }

  /**
     * Active listener on desktop
     */
  desktopListener() {
    // Wheel (scroll)
    window.addEventListener('wheel', (e) => {
      if (e.deltaY >= 10 || e.deltaY <= -10) {
        if (e.timeStamp > (this.event_timeStamp + this.delay)) {
          this.event_timeStamp = e.timeStamp
          this.callback(this.getWheelDirection(e))
        }
      }
    })

    // Keyboard
    if (this.keyboardNavigation) {
      window.addEventListener('keydown', (e) => {
        if (e.timeStamp > (this.event_timeStamp + this.delay)) {
          this.event_timeStamp = e.timeStamp
          this.keyboardAction(e)
        }
      })
    }
  }

  /**
     * Function that gonna return the direction of the wheel for the desktop
     * @param {event} e - The wheel event
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
