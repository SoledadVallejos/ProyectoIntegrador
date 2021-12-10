console.log('loginValidator success');

const $ = id => document.getElementById(id); //Funcion para capturar los ID

const formulario = $('form-login');


const inputEmail = $('email');
const inputPassword = $('password');
const checkTerms = $('terms');


/* expresiones regulares */
const regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/
const regExPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/


/* email */
/* inputEmail.addEventListener('focus', function () {
    $('info-email').innerText = "Escriba un email válido"
    $('error-email').innerText = null;
    this.classList.remove('is-invalid');
}) */

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