class Anchor {
  constructor() {
    this.current_hash = window.location.hash.substr(1)
    this.active_section = document.querySelector('.section--active')
    this.waves = document.querySelector('.waves')
    this.bubbles = document.querySelector('.bubbles')

    this.sectionActivation()
  }
  sectionActivation() {
    if (this.current_hash) {
      this.section_equal_hach = document.querySelector(`section[data-anchor =${this.current_hash}]`)
      // if hash match to a section
      if (this.section_equal_hach) {
        this.active_section.classList.remove('section--active')
        this.section_equal_hach.classList.add('section--active')

        this.color()
      }
    }
  }
  color() {
    this.next_anchor = this.section_equal_hach.getAttribute('data-anchor')
    // waves
    this.waves.classList.remove('waves__color--accueil')
    this.waves.classList.add(`waves__color--${this.next_anchor}`)

    // bubbles
    this.bubbles.classList.remove('bubbles__color--accueil')
    this.bubbles.classList.add(`bubbles__color--${this.next_anchor}`)
  }
}


export default Anchor
