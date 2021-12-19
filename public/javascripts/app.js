console.log('app.js success')
let logo = document.querySelector('a.navbar-brand');
    
/* logo.onclick = function(e){
    e.preventDefault();
    alert('Craftsy for ever!!!!!');
    window.location = '/'
} */

logo.addEventListener('mouseover', e => {
    e.preventDefault();
    //console.log('Craftsy for ever!!!!!');
})

logo.addEventListener('mouseout', e => {
    e.preventDefault();
    //console.log('Dejanos tus comentarios!!!');
})

/* document.body.addEventListener('keydown', e => {
    console.log(e.key)
}) */

document.body.addEventListener('keyup', e => {
    //console.log(e.key)
})