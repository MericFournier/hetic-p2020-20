import ScrollListener from './ScrollListener'
import ScrollAnimation from './ScrollAnimation';
import Bubble from './Bubble';
import Anchor from './Anchor';


// Anchor test
let anchor = new Anchor()

// Init scroll animation
let scrollInit = (direction) => {
    let scrollAnim = new ScrollAnimation(direction)
}


// Listener Scroll
let scroll = new ScrollListener(scrollInit , 1500, true)


// let detail = new DetailBottle()
// detail.buttonListener()

let bubbless = new Bubble()
bubbless.createBubble()
