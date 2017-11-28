import ScrollListener from './scroll/ScrollListener'
import ScrollAnimation from './scroll/ScrollAnimation'
import Bubble from './Bubble'
import Anchor from './Anchor'
import ListenDrag from './ListenDrag'
import GyroscopeBubble from './GyroscopeBubble'


window.addEventListener('load', () => {
  // Anchor test
  const anchor = new Anchor()

  // Init scroll animation
  const scrollAnim = new ScrollAnimation()

  // Listener Scroll
  let scroll = new ScrollListener(scrollAnim.initAnimation, 1500, true, scrollAnim)

  const bubbles = new Bubble()

  const gyroBubble = new GyroscopeBubble()

})

const drag = new ListenDrag()

