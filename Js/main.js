const nav = document.querySelector('#nav');

window.addEventListener('scroll', ()=>{
    if(window.scrollY >=100){
        nav.classList.add('nav_black')
    }else{
        nav.classList.remove('nav_black')
    }
});

console.log(nav)