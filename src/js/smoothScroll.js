class ObjScroll {
    constructor(){
        this.event_timeStamp    = -2500
        this.scroll_wrapper     = document.querySelector('.smoothScroll-wrapper') // translate wrapper
        this.scroll_section     = document.querySelectorAll('section') // get the active section
        this.waves              = document.querySelector('.waves')
        this.sub_waves_div      = document.querySelector('.waves__subWaveDiv')
        this.current_section    = 0
        this.anchor             = "accueil"

    }
    listenScroll(){
        // Test tactile device
        if('ontouchstart' in window) {
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

    desktopListener() {
        // Wheel (scroll)
        window.addEventListener('wheel', (e) => {
            this.scrollAnimation(this.getWheelDirection(e))
        })

        // Keyboard
        window.addEventListener('keydown', (e) => {
            this.keyboardNavigation(e)
        })
    }

    buttonListener() {
        const previous_button    = this.scroll_wrapper.querySelectorAll('.navigation-button .navigation-button__previous')
        const next_button        = this.scroll_wrapper.querySelectorAll('.navigation-button .navigation-button__next')
        // Button previous
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
    getWheelDirection(e) {
        const deltaX = Math.max(-1, Math.min(1, (e.deltaX) )) // Get scroll X
        const deltaY = Math.max(-1, Math.min(1, (e.deltaY) )) // Get scroll Y

        // Get wheel event only every 1.5 second
        if(e.timeStamp > (this.event_timeStamp+2500)) {
            this.event_timeStamp = e.timeStamp
            if (deltaY != 0) {
                if(deltaY > 0) {
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
    keyboardNavigation(e) {
        // Down
        if(e.keyCode == 40 ) {
            this.nextSection()
        }
        // Up
        else if(e.keyCode == 38 ) {
            this.previousSection()
        }
    }

    nextSection() {
        let direction = {}
        direction.axe = "y"
        direction.orientation = parseInt(1)
        this.scrollAnimation(direction)
    }
    previousSection() {
        let direction = {}
        direction.axe = "y"
        direction.orientation = parseInt(-1)
        this.scrollAnimation(direction)
    }

    scrollAnimation(direction) {
        // scroll Y
        if (direction && direction.axe == 'y') {
            const section_active = document.querySelector('.section--active') //get active section
            const current_section = this.current_section + direction.orientation // get the next of translate

            // Test next section
            if (current_section < this.scroll_section.length && current_section >= 0) {
                this.current_section = this.current_section + direction.orientation

                // scroll next
                if (direction.orientation > 0) {
                    this.waves.style.animation = "transitionPage 2s"
                }
                // scroll previous
                else if (direction.orientation < 0) {
                    this.waves.style.animation = "transitionPage 2s reverse"
                }


                window.setTimeout(() => {
                    // remove the color wave class
                    this.waves.classList.remove('waves__'+this.anchor)
                    // set the new anchor
                    this.anchor = this.scroll_section[this.current_section].getAttribute('data-anchor')
                    // ass the color wave class
                    this.waves.classList.add('waves__'+this.anchor)


                    window.location.hash = this.anchor // Anchor in url

                    window.setTimeout(() => {
                        // reset animation
                        this.waves.style.animation = ""
                    },1000)
                },1000)


                // change section
                section_active.classList.remove('section--active')
                this.scroll_section[this.current_section].classList.add('section--active')

            }
        }
    }
}

export default ObjScroll
