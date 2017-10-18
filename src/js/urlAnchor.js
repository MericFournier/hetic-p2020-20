class Anchor {
    constructor() {
        this.hash = window.location.hash.substr(1)
    }
    anchorTest(){
        if(hash){
            this.section_equal_hach = document.querySelector('section[data-anchor ='+ hash +']')
            //if hash match to a section
            if(section_to_hach){
                this.translate_values   = this.section_equal_hach.getAttribute('data-scroll')
                this.scrollY_active     = document.querySelector('.scrollY-active')
                this.scroll_section     = document.querySelectorAll('section')

                // translate action
                document.querySelector('#smoothScroll-wrapper').style.transform = 'translateY(-'+ this.translate_values *100+'vh)'

                // get active section position
                this.active_attribute   = parseInt(scrollY_active.getAttribute('data-scroll'))

                // add class scrollY-active to the active section
                this.scrollY_active.classList.remove("scrollY-active")
                this.scroll_section[this.translate_values].classList.add('scrollY-active')
            }
            else{
                window.location.hash = 'acceuil'
            }
        }
    }
}


export default Anchor
