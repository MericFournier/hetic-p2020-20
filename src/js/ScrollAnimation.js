/**
 * Callback from scrollListener
 */
export default class ScrollAnimation {
    constructor(direction){
        this.scroll_wrapper     = document.querySelector('.smoothScroll-wrapper')
        this.sections           = document.querySelectorAll('.section')
        this.current_section    = document.querySelector('.section--active')
        this.waves              = document.querySelector('.waves')
        this.bubbles            = document.querySelector('.bubbles')
        this.direction          = direction
        this.animation_duration  = '2'

        // launch the animation
        this.initAnimation()
    }
    /**
     * @param {obj} direction - Direction of the scroll
     */
    initAnimation() {
        if (this.direction && this.direction.axe == 'y') {
            this.testNextSection()

        }
    }
    testNextSection(){
        this.current = parseInt(this.current_section.getAttribute("data-section"))
        this.next    = this. current + this.direction.orientation
        if(this.next >= 0 && this.next < this.sections.length)
        {
            this.next_section = this.sections[this.next]
            this.directionWaves()
        }
        else{
            return false
        }
    }
    directionWaves() {
        if(this.direction.orientation == 1){
            this.animeDown()
        }
        else{
            this.animeUp()
        }
    }
    animeUp(){
        this.waves.style.animation = "transitionPage "+ this.animation_duration +"s cubic-bezier(0.82, 0.24, 0.83, 1.1) reverse"
        this.removeWaveAnimation()
    }
    animeDown(){
        this.waves.style.animation = "transitionPage "+ this.animation_duration +"s "
        this.removeWaveAnimation()
    }
    removeWaveAnimation(){
        let timer_end = this.animation_duration * 1000
        window.setTimeout(() => {
            this.waves.style.animation = ""
        }, timer_end)
        this.changeSection()
    }
    changeSection(){
        this.current_section.classList.remove('section--active')
        this.next_section.classList.add('section--active')
        this.setAnchor()
    }

    setAnchor(){
        this.next_anchor = this.next_section.getAttribute('data-anchor')
        window.location.hash = this.next_anchor // Anchor in url

    }
}