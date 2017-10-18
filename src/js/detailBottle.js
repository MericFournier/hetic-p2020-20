class DetailBottle {
    constructor() {
        this.openButtons = document.querySelectorAll('a.show-detail')
        this.closeButtons = document.querySelectorAll('.close-detail a')
    }
    buttonListener(){
        this.openButtons.forEach( (_button) => {
            _button.addEventListener('click', (e) => {
                document.querySelector('.scrollY-active .detail').classList.add('detail-active')
                e.preventDefault()
            })
        })

        this.closeButtons.forEach( (_button) => {
            _button.addEventListener('click', (e) => {
                document.querySelector('.scrollY-active .detail').classList.remove('detail-active')
                e.preventDefault()
            })
        })
    }
}

export default DetailBottle
