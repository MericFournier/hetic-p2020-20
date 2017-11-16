import ScrollListener from './ScrollListener'
import ScrollAnimation from './ScrollAnimation'
import Bubble from './Bubble'
import Anchor from './Anchor'

window.addEventListener('load', () => {
  // Anchor test
  const anchor = new Anchor()

  // Init scroll animation
  const scrollInit = (direction) => {
    const scrollAnim = new ScrollAnimation(direction)
  }

  // Listener Scroll
  const scroll = new ScrollListener(scrollInit, 1500, true)


  // let detail = new DetailBottle()
  // detail.buttonListener()

  const bubbles = new Bubble()
  bubbles.createBubble()
})
