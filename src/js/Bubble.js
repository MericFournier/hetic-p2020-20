/**
     * Class that create bubles in the background 
     */

class Bubble {
  constructor() {
    this.container = document.querySelector('.bubbles__orientation')
    this.bubbles = []
    this.bubbleNumber = Math.floor((2 * window.innerWidth) / 100)
    this.bubbleSizeMin = 8
    this.bubbleSizeMax = 30
    this.unitGenerate = 'vw'

    this.createBubble()
  }

  /**
   * @param {int} min
   * @param {int} max
   * @returns {int} element
   */
  static aleat(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min
  }
  static generateBubble() {
    const bubble = {}
    bubble.element = document.createElement('div')
    bubble.element.classList.add('bulle')
    return bubble.element
  }
  createBubble() {
    this.bubbleContainerSize()
    window.addEventListener('resize', this.bubbleContainerSize())
    window.setInterval(() => {
      // Remove Bubble out screen
      for (let i = 0; i < this.bubbles.length; i += 1) {
        const delay = parseInt(this.bubbles[i].style.animationDelay, 10)
        const duration = parseInt(this.bubbles[i].style.animationDuration, 10)
        if (this.bubbles[i].timestamp + delay + duration < new Date()) {
          this.container.removeChild(this.bubbles[i])
          this.bubbles.splice(i, 1)
        }
      }
      // create Bubble
      if (this.bubbles.length < this.bubbleNumber) {
        const i = this.bubbles.length
        const diameter = `${Bubble.aleat(this.bubbleSizeMin, this.bubbleSizeMax)}px`
        const left = `${Bubble.aleat(0, 100) + this.unitGenerate}`
        const duration = Bubble.aleat(1200, 10000)
        const delay = Bubble.aleat(100, 100)
        this.bubbles[i] = Bubble.generateBubble()
        this.bubbles[i].style.width = diameter
        this.bubbles[i].style.height = diameter
        this.bubbles[i].style.left = left
        this.bubbles[i].style.left = left
        this.bubbles[i].classList.add('bubble')
        this.bubbles[i].classList.add(`bubble${i}`)
        this.bubbles[i].style.animationDuration = `${duration}ms`
        this.bubbles[i].style.animationDelay = `${delay}ms`
        this.bubbles[i].timestamp = new Date().getTime()
        this.container.appendChild(this.bubbles[i])
      }
    }, 100)
  }
  bubbleContainerSize() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      if (window.innerWidth < window.innerHeight) {
        this.unitGenerate = 'vh'
      } else {
        this.unitGenerate = 'vw'
      }
    }
  }
}
export default Bubble
