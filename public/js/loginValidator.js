console.log('loginValidator success');

const $ = id => document.getElementById(id); //Funcion para capturar los ID

const formulario = $('form-login');


const inputEmail = $('email');
const inputPassword = $('password');
const btnWatch = $('watch');



/* expresiones regulares */
const regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/



/* email */


inputEmail.addEventListener('keydown', function () {
    $('info-email').innerText = null;
})

inputEmail.addEventListener('blur', function () {
    switch (true) {
        case !this.value:
            $('info-email').innerText = null
            $('error-email').innerText = "El email es requerido";
            this.classList.add('is-invalid')
            break;
        case !regExEmail.test(this.value):
            $('error-email').innerText = "Email inválido";
            this.classList.add('is-invalid');
            break;
        default:
            $('error-email').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})

/* password */

inputPassword.addEventListener('blur', function () {
    switch (true) {
        case !this.value:
            $('info-password').innerText = null
            $('error-password').innerText = "Este campo es requerido";
            this.classList.add('is-invalid')
            break;
        default:
            $('error-password').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})

/* ver contraseña */
btnWatch.addEventListener('click', () => {
    inputPassword.type === "text" ? inputPassword.type = "password" : inputPassword.type = "text";
    console.log(inputPassword.type)
})

////////////////*********************////////////////

formulario.addEventListener('submit', e => {

    e.preventDefault();

    let error = false;
    const elementos = formulario.elements;

    for (let i = 0; i < elementos.length - 2; i++) {

        if (!elementos[i].value) {
            elementos[i].classList.add('is-invalid');
            $('error-empty').innerText = "Los campos señalados son obligatorios";
            error = true;
        }

    }

    if (!error) {
        formulario.submit()
    }

})