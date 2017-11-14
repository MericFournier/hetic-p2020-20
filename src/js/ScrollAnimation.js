/**
 * Callback from scrollListener
 */
export default class ScrollAnimation {
    constructor(direction){
        this.scroll_wrapper     = document.querySelector('.smoothScroll-wrapper')
        this.scroll_section     = document.querySelectorAll('section')
        this.waves              = document.querySelector('.waves')
        this.bubbles            = document.querySelector('.bubbles')
        this.direction          = direction

        // launch the animation
        this.testAnimate()
    }
    /**
     * @param {obj} direction - Direction of the scroll
     */
    testAnimate() {
        if (this.direction && this.direction.axe == 'y') {
            this.anime()
        }
    }
    anime() {
        console.log(this.direction)
        if(this.direction.orientation == 1){
            console.log('down')
        }
        else{
            console.log('up')
        }
    }
}