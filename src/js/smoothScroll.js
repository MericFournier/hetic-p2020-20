let event_timeStamp     = -1500
const scroll_wrapper    = document.querySelector('#smoothScroll-wrapper') // translate wrapper
const scroll_section    = scroll_wrapper.querySelectorAll('section')
const previous_button   = scroll_wrapper.querySelectorAll('.navigation-button .previous-navigation-button')
const next_button       = scroll_wrapper.querySelectorAll('.navigation-button .next-navigation-button')

const listenScroll = () => {

    previous_button.forEach((_previous_button) => {
        _previous_button.addEventListener('click', (e) => {
            previousSection()
            e.preventDefault()
        })
    })
    next_button.forEach((_next_button) => {
        _next_button.addEventListener('click', (e) => {
            nextSection()
            e.preventDefault()
        })
    })


    if('ontouchstart' in window){
        touchScreenAnimation()
    }
    else{
        // Listen scroll (wheel)
        window.addEventListener('wheel', (e) => {
            scrollAnimation(getWheelDirection(e))
        })

        // Listen keyboardNavigation
        window.addEventListener('keydown', (e) => {
            keyboardNavigation(e)
        })
    }
}

const getWheelDirection = (e) => {
        const deltaX = Math.max(-1, Math.min(1, (e.deltaX) )) // Get scroll X
        const deltaY = Math.max(-1, Math.min(1, (e.deltaY) )) // Get scroll Y

        if(e.timeStamp > (event_timeStamp+1500)){ // Get wheel event only every 1.5 second
            event_timeStamp = e.timeStamp
            if (deltaY != 0) {
                if(deltaY > 0){
                    nextSection()
                }
                else {
                    previousSection()
                }
            }
        }
        else {
            return false
        }
}

const touchScreenAnimation = () => {
    let touch_start
    let touch_end
    let direction = {}

    document.addEventListener('touchstart', (e) => {
        touch_start = parseInt(e.changedTouches[0].pageX)
    })
    document.addEventListener('touchend', (e) => {
        touch_end = parseInt(e.changedTouches[0].pageX)
        if(touch_start - 5 > touch_end){
            direction.axe = "y"
            direction.orientation = parseInt(1)
             scrollAnimation(direction)
        }
        else if(touch_start + 5 < touch_end) {
            direction.axe = "y"
            direction.orientation = parseInt(-1)
             scrollAnimation(direction)
        }

    })

}

const nextSection = () => {
    let direction = {}
    direction.axe = "y"
    direction.orientation = parseInt(1)
    scrollAnimation(direction)
}

const previousSection = () => {
    let direction = {}
    direction.axe = "y"
    direction.orientation = parseInt(-1)
    scrollAnimation(direction)
}

const keyboardNavigation = (e) => {
    // down
    if(e.keyCode == 40 ){
        nextSection()
    }
    //up
    else if(e.keyCode == 38 ){
        previousSection()
    }
}

const scrollAnimation = (direction) => {

    // scroll Y
    if (direction && direction.axe == 'y'){

        const scrollY_active = scroll_wrapper.querySelector('.scrollY-active') // get the active section
        const active_attribute = parseInt(scrollY_active.getAttribute('data-scroll')) // get active section position
        const translate_values = active_attribute + direction.orientation // get the next of translate

        if(translate_values < scroll_section.length && translate_values >= 0){

            scroll_wrapper.style.transform = "translateY(-"+ translate_values*100 +"vh)" // translate action

            //Change the active section
            scrollY_active.classList.remove("scrollY-active")
            scroll_section[translate_values].classList.add('scrollY-active')

            window.location.hash = '#' + scroll_wrapper.querySelector('.scrollY-active').getAttribute('data-anchor') // Anchor in url
        }
    }
}

export {
    listenScroll,
    scrollAnimation
}
