class Bubble{
    constructor(){
        this.container      = document.querySelector('.bubbles')
        this.count          = 0
        this.bubbles        = []
        this.bubbleNumber   = 20
        this.bubbleSizeMin  = 8
        this.bubbleSizeMax  = 18
    }
    aleat(min,max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    generateBubble(){
        const buble     = {}
        buble.element   = document.createElement('div')
        buble.element.classList.add('bulle')
        return buble.element;
    }
    createBubble(){
        window.setInterval(() => {

            // Remove Buddle out screen
            for (var i = 0; i < this.bubbles.length; i++) {
                var delay = parseInt(this.bubbles[i].style.animationDelay)
                var duration = parseInt(this.bubbles[i].style.animationDuration)
                var end = this.bubbles[i].timestamp + delay + duration
                if(this.bubbles[i].timestamp + delay + duration < new Date()){
                    this.container.removeChild(this.bubbles[i])
                    this.bubbles.splice(i , 1);
                }
            }
            // create Bubble
            if(this.bubbles.length < this.bubbleNumber) {
                var i = this.bubbles.length
                const diameter                          = this.aleat( this.bubbleSizeMin, this.bubbleSizeMax)+ "px"
                const left                              = this.aleat(0,100) + "vw"
                const duration                          = this.aleat(1200,10000)
                const delay                             = this.aleat(100,100)
                this.bubbles[i]                         = this.generateBubble()
                this.bubbles[i].style.width             = diameter
                this.bubbles[i].style.height            = diameter
                this.bubbles[i].style.left              = left
                this.bubbles[i].style.left              = left
                this.bubbles[i].classList.add('bubble')
                this.bubbles[i].classList.add('bubble'+i)
                this.bubbles[i].style.animationDuration = duration + 'ms'
                this.bubbles[i].style.animationDelay    = delay + 'ms'
                this.bubbles[i].timestamp               = new Date().getTime()
                this.container.appendChild(this.bubbles[i]);
                const container = this.container
                const _bubble   = this.bubbles[i]
                const that = this
            }
        },100)
    }
}
export default Bubble
