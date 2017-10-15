let event_timeStamp = 0
const scroll_wrapper = document.querySelector('#smoothScroll-wrapper') // translate wrapper
const scroll_section = scroll_wrapper.querySelectorAll('section')

const listenScroll = () => {
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
        const direction = {}
        if(e.timeStamp > (event_timeStamp+1500)){ // Get wheel event only every 1.5 second
            event_timeStamp = e.timeStamp
            if (deltaY != 0) {
                direction.axe = "y"
                direction.orientation = parseInt(deltaY)
            }
            else if (deltaX != 0) {
                direction.axe = "x"
                direction.orientation = parseInt(deltaX)
            }
            return direction
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

const scrollAnimation = (direction) => {

    // scroll Y
    if (direction && direction.axe == 'y'){

        const scrollY_active = scroll_wrapper.querySelector('.scrollY-active') // get the active section
        const active_attribute = parseInt(scrollY_active.getAttribute('data-scroll')) // get active section position

        let translate_values = active_attribute + direction.orientation // get the next of translate

        if(translate_values < scroll_section.length && translate_values >= 0){
            scroll_wrapper.style.transform = "translateY(-"+ translate_values*100 +"vh)" // translate action

            //Change the active section
            scrollY_active.classList.remove("scrollY-active")
            scroll_section[translate_values].classList.add('scrollY-active')

            window.location.hash = '#' + scroll_wrapper.querySelector('.scrollY-active').getAttribute('data-anchor'); // Anchor in url
        }
    }
}

const keyboardNavigation = (e) => {
    let direction = {}
    // down
    if(e.keyCode == 40 ){
        direction.axe = "y"
        direction.orientation = parseInt(1)
        scrollAnimation(direction)
    }
    //up
    else if(e.keyCode == 38 ){
        direction.axe = "y"
        direction.orientation = parseInt(-1)
        scrollAnimation(direction)
    }
}


export default listenScroll
