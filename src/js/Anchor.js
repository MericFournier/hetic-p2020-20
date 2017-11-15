class Anchor {
  constructor() {
    this.current_hash = window.location.hash.substr(1)
    this.active_section = document.querySelector('.section--active')

    this.anchorTest()
  }
  anchorTest() {
    if (this.current_hash) {
      this.section_equal_hach = document.querySelector(`section[data-anchor =\${${this.current_hash}}]`)
      // if hash match to a section
      if (this.section_equal_hach) {
        this.active_section.classList.remove('section--active')
        this.section_equal_hach.classList.add('section--active')
      }
    }
  }
}


export default Anchor
