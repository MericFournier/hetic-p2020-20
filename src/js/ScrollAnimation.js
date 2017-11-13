/**
 * Callback from scrollListener
 */

export default class ScrollAnimation {
    constructor(){
        this.scroll_wrapper     = document.querySelector('.smoothScroll-wrapper') // translate wrapper
        this.scroll_section     = document.querySelectorAll('section') // get the active section
        this.waves              = document.querySelector('.waves')
        this.sub_waves_div      = document.querySelector('.waves__subWaveDiv')
        this.current_section    = 0
        this.anchor             = "accueil"
        this.bubbles            = document.querySelector('.bubbles')
    }
    /**
     * @param {obj} direction - Direction of the scroll
     */
    animate(direction){
        console.log(direction)
    }

}