let event_timeStamp = 0
const scroll_wrapper = document.querySelector('#smoothScroll-wrapper')
const scroll_section = scroll_wrapper.querySelectorAll('section')


const listen = () => {
    console.log('liqten')
    window.addEventListener('wheel', (e) => {
        scrollAnimation(getScrollDirection(e))
    })
}

const getScrollDirection = (e) => {
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

const scrollAnimation = (direction) => {

    // scroll Y
    if (direction && direction.axe == 'y'){

        const scrollY_active = scroll_wrapper.querySelector('.scrollY-active') // get the active section
        const active_attribute = parseInt(scrollY_active.getAttribute('data-scroll')) // get active section position

        let translate_values = active_attribute + direction.orientation // get the value of translate

        if(translate_values > scroll_section.length-1){ // end of the page
            translate_values = (scroll_section.length-1)
        }
        if (translate_values < 0) { //top of the page
            translate_values = 0
        }
        scroll_wrapper.style.transform = "translateY(-"+ translate_values*100 +"vh)" // translate action
        //Change the active section
        scrollY_active.classList.remove("scrollY-active")
        scroll_section[translate_values].classList.add('scrollY-active')
    }
}


export default listen
