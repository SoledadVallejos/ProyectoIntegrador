console.log('registerValidator success');

const $ = id => document.getElementById(id);

const emailVerify = async email => {
    try {
        let response = await fetch('/api/get-emails?email=' + email)
        let result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

const formulario = $('form-register');

const inputName = $('name');
const inputEmail = $('email');
const inputPassword = $('password');
const inputPassword2 = $('password2');
const checkTerms = $('terms');
const btnWatch = $('watch');

/* expresiones regulares */
const regExLetras = /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/
const regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/ 
const regExPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/

/* nombre */
inputName.addEventListener('focus', function() {
    $('info-name').innerText = "Solo letras"
    $('error-name').innerText = null;
    this.classList.remove('is-invalid');
})

inputName.addEventListener('keydown', function() {
    $('info-name').innerText = null;
})

inputName.addEventListener('blur', function() {
    switch (true) {
        case !this.value :
            $('error-name').innerText = "El nombre es requerido";
            this.classList.add('is-invalid')
            break;
        case !regExLetras.test(this.value) :
            $('error-name').innerText = "Solo se permiten letras";
            this.classList.add('is-invalid');
            break;
        default:
            $('error-name').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})
/* email */
inputEmail.addEventListener('focus', function() {
    $('info-email').innerText = "Escriba un email válido"
    $('error-email').innerText = null;
    this.classList.remove('is-invalid');
})

inputEmail.addEventListener('keydown', function() {
    $('info-email').innerText = null;
})

inputEmail.addEventListener('blur', async function() {
    switch (true) {
        case !this.value :
            $('error-email').innerText = "El email es requerido";
            this.classList.add('is-invalid')
            break;
        case !regExEmail.test(this.value) :
            $('error-email').innerText = "Email inválido";
            this.classList.add('is-invalid');
            break;
        case await emailVerify(this.value) :
            $('error-email').innerText = "El email ya está registrado!!";
            this.classList.add('is-invalid');
            break 
        default:
            $('error-email').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})
/* password */
inputPassword.addEventListener('focus', function() {
    $('info-password').innerText = "Mayúscula, minúscula, número y caracter especial"
    $('error-password').innerText = null;
    this.classList.remove('is-invalid');
})

inputPassword.addEventListener('keydown', function() {
    $('info-password').innerText = null;
})

inputPassword.addEventListener('blur', function() {
    switch (true) {
        case !this.value :
            $('error-password').innerText = "La contraseña es requerida";
            this.classList.add('is-invalid')
            break;
        case !regExPassword.test(this.value) :
            $('error-password').innerText = "Mayúscula, minúscula, número y caracter especial, 8 a 16 caracteres";
            this.classList.add('is-invalid');
            break;
        default:
            $('error-password').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
})

/* confirmar password */
inputPassword2.addEventListener('keyup', function() {
   if(this.value === inputPassword.value){
    console.log(this.value)
        this.classList.remove('is-invalid')
       this.classList.add('is-valid')
   }else{
    this.classList.remove('is-valid')
    $('error-password2').innerText = null;
   }
})

inputPassword2.addEventListener('blur', function() {
    switch (true) {
        case !this.value :
            $('error-password2').innerText = "Debe confirmar su contraseña";
            this.classList.add('is-invalid')
            break;
        case this.value !== inputPassword.value :
            $('error-password2').innerText = "Las contraseñas no coinciden";
            this.classList.add('is-invalid');
            break;
        default:
            $('error-password2').innerText = null;
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            break;
    }
});

/* ver contraseña */
btnWatch.addEventListener('click', () => {
    inputPassword.type === "text" ? inputPassword.type = "password" : inputPassword.type = "text";
    console.log(inputPassword.type)
})

/* términos */
terms.addEventListener('click',function(e) {
    this.classList.toggle('is-valid');
    this.classList.remove('is-invalid');
    $('error-terms').innerText = null;
    console.log(this.checked)
})

formulario.addEventListener('submit', e => {
    
    e.preventDefault();
    
    let error = false;
    const elementos = formulario.elements;
    
    for (let i = 0; i < elementos.length - 2; i++) {
        
        if(!elementos[i].value){
            elementos[i].classList.add('is-invalid');
            $('error-empty').innerText = "Los campos señalados son obligatorios";
            error = true;
        }
        
    }

    if(!terms.checked){
        terms.classList.add('is-invalid');
        $('error-terms').innerText = "Debes aceptar las bases y condiciones";
        error = true
    }

    if(!error){
        formulario.submit()
    }

})