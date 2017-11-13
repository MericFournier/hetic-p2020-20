import ScrollListener from './ScrollListener'
import ScrollAnimation from './ScrollAnimation';
import Bubble from './Bubble';


// Anchor test
//var anchor = new Anchor()

// Init scroll animation
let scrollAnim = new ScrollAnimation()


function azerty(direction){
    console.log(direction)
}

// Listener Scroll
let scroll = new ScrollListener(scrollAnim.animate, 1500, true)


// var detail = new DetailBottle()
// detail.buttonListener()

let bubbless = new Bubble()
bubbless.createBubble()
