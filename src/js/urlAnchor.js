const anchor = () => {
    const hash = window.location.hash.substr(1)
    if(hash){
        const section_to_hach = document.querySelector('section[data-anchor='+hash+']')
        if(section_to_hach){
            const translate_values = section_to_hach.getAttribute('data-scroll')
            const scrollY_active = document.querySelector('.scrollY-active') // get the active section
            const scroll_section    = document.querySelectorAll('section')

            document.querySelector('#smoothScroll-wrapper').style.transform = 'translateY(-'+ translate_values *100+'vh)'

            const active_attribute = parseInt(scrollY_active.getAttribute('data-scroll')) // get active section position

            // add class scrollY-active to the active section
            scrollY_active.classList.remove("scrollY-active")
            scroll_section[translate_values].classList.add('scrollY-active')
        }
        else{
            window.location.hash = 'acceuil'
        }
    }
}




export default anchor
