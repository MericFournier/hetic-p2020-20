const anchor = () => {
    const hash = window.location.hash.substr(1)
    const section_to_hach = document.querySelector('section[data-anchor='+hash+']')
    document.querySelector('#smoothScroll-wrapper').style.transform = 'translateY(-'+ section_to_hach.getAttribute('data-scroll')*100+'vh)'
}




export default anchor
