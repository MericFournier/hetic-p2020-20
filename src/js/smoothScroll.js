class ObjScroll {
    constructor(){
        this.event_timeStamp    = -1500
        this.scroll_wrapper     = document.querySelector('#smoothScroll-wrapper') // translate wrapper
        this.scroll_section     = this.scroll_wrapper.querySelectorAll('section') // get the active section


    }
    listenScroll(){

        // Test tactile device
        if('ontouchstart' in window){
            this.mobileListener()
        }
        this.desktopListener()
        this.buttonListener()
    }
    mobileListener(){
        // iphone block scroll
        window.addEventListener('scroll', (e) => {
            e.preventDefault()
            window.scroll(0,0)
        })
        window.addEventListener('touchmove', (e) => {
            e.preventDefault()
        })

        // Homemade scroll listener
        let touch = {}
        let direction = {}

        document.addEventListener('touchstart', (e) => {
            touch.start = parseInt(e.changedTouches[0].pageY)
        })
        document.addEventListener('touchend', (e) => {
            touch.end = parseInt(e.changedTouches[0].pageY)
            if(touch.start - 5 > touch.end){
                direction.axe = "y"
                direction.orientation = parseInt(1)
                this.scrollAnimation(direction)
            }
            else if(touch.start + 5 < touch.end) {
                direction.axe = "y"
                direction.orientation = parseInt(-1)
                this.scrollAnimation(direction)
            }

        })
    }
    desktopListener(){
        // Wheel (scroll)
        window.addEventListener('wheel', (e) => {
            this.scrollAnimation(this.getWheelDirection(e))
        })

        // Keyboard
        window.addEventListener('keydown', (e) => {
            this.keyboardNavigation(e)
        })
    }
    buttonListener(){
        const previous_button    = this.scroll_wrapper.querySelectorAll('.navigation-button .previous-navigation-button')
        const next_button        = this.scroll_wrapper.querySelectorAll('.navigation-button .next-navigation-button')
        // Button previous
        console.log('button')
        previous_button.forEach((_previous_button) => {
            _previous_button.addEventListener('click', (e) => {
                this.previousSection()
                e.preventDefault()
            })
        })
        // Button next
        next_button.forEach((_next_button) => {
            _next_button.addEventListener('click', (e) => {
                this.nextSection()
                e.preventDefault()
            })
        })
    }
    getWheelDirection(e){
        const deltaX = Math.max(-1, Math.min(1, (e.deltaX) )) // Get scroll X
        const deltaY = Math.max(-1, Math.min(1, (e.deltaY) )) // Get scroll Y

        // Get wheel event only every 1.5 second
        if(e.timeStamp > (this.event_timeStamp+1500)){
            this.event_timeStamp = e.timeStamp
            if (deltaY != 0) {
                if(deltaY > 0){
                    this.nextSection()
                }
                else {
                    this.previousSection()
                }
            }
        }
        else {
            return false
        }
    }
    keyboardNavigation(e){
        // Down
        if(e.keyCode == 40 ){
            this.nextSection()
        }
        // Up
        else if(e.keyCode == 38 ){
            this.previousSection()
        }
    }

    nextSection(){
        let direction = {}
        direction.axe = "y"
        direction.orientation = parseInt(1)
        this.scrollAnimation(direction)
    }
    previousSection(){
        let direction = {}
        direction.axe = "y"
        direction.orientation = parseInt(-1)
        this.scrollAnimation(direction)
    }

    scrollAnimation(direction){

        // scroll Y
        if (direction && direction.axe == 'y'){

            const scrollY_active = this.scroll_wrapper.querySelector('.scrollY-active') // get the active section
            const active_attribute = parseInt(scrollY_active.getAttribute('data-scroll')) // get active section position
            const translate_values = active_attribute + direction.orientation // get the next of translate

            if(translate_values < this.scroll_section.length && translate_values >= 0){

                this.scroll_wrapper.style.transform = "translateY(-"+ translate_values*100 +"vh)" // translate action

                //Change the active section
                scrollY_active.classList.remove("scrollY-active")
                this.scroll_section[translate_values].classList.add('scrollY-active')

                window.location.hash = '#' + this.scroll_wrapper.querySelector('.scrollY-active').getAttribute('data-anchor') // Anchor in url
            }
        }
    }
}

export default ObjScroll
