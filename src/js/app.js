import ScrollListener from './ScrollListener'
import ScrollAnimation from './ScrollAnimation'
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

/*
const element = document.querySelector('.swiper__circle')
const options = {
  grid: 200,
  limit: {
    x: [1, 200],
    y: [-5, 5]
  },
  smoothDrag: true,
  onDrag: (drag, e) => {
    if (e >= 200) {
    }
  },
}

*/

