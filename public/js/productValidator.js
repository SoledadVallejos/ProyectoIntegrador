// NECESARIOADD

// window.onload ESPERA A QUE SE CARGUE EL HTML Y LUEGO EJECUTA ESTE script
// SOLUCIONA PROBLEMA DE EJECUCIÓN DE DOS scripts AL MISMO TIEMPO PUESTOS ANTES del </body> productsEdit.js y productValidator.js
window.onload = () => {
    //Aqui dentro TODO tu codigo

    // COMPROBAR CONEXIÓN CON FORMULARIO DEL ARCHIVO
    console.log('add profundizando en código de profe Eric');
    let elements = document.querySelectorAll('input')
    console.log(elements);
    // BUSCAR ELEMENTO POR id
    const $ = id => document.getElementById(id);
    // EN formproductadd PONER id DE FORMULARIO
    const formproductadd = $('formproductadd'); // DEACTIVAR VALIDACIONES FRONT AQUI
    // VALOR 1MB
    const oneMB = 1048576;
    // PARA VALIDAR EXTENSIONES
    const regExExt = /(.jpg|.jpeg|.png|.gif|.webp)$/i;
    // OTRA FORMA DE SOLICITAR UN id (preview)
    var preview = document.querySelector('#preview');

    // IMAGES
    // CONTAR fields                [0] EN ESTE CASO, HASTA ENCONTRAR EL field AL QUE QUIERES APUNTAR, O CONTARLOS, O MIRAR LOS NODOS EN CONSOLE...
    formproductadd.elements[0].addEventListener('change', function (e) {
        switch (true) {
            case !regExExt.exec(this.value):
                imageError.innerHTML = "Solo imágenes con extensión jpg, jpeg, png, gif, webp"
                this.classList.add('is-invalid')
                preview.innerHTML = null;
                break;
            case !this.value:
                imageError.innerHTML = "Tiene subir una imagen"
                this.classList.add('is-invalid');
                preview.innerHTML = null;
                break
            case this.files.length > 3:
                imageError.innerHTML = "Solo se permiten 3 imágenes"
                this.classList.add('is-invalid');
                preview.innerHTML = null;
                break
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                $('btnImagen').classList.add('btn-outline-secondary');
                $('btnImagen').classList.remove('btn-outline-danger');
                imageError.innerHTML = null;
                btnImagen.innerText = "Cambiar imágenes"
                if (this.files) {
                    [].forEach.call(this.files, readAndPreview);
                }
                function readAndPreview(file) {
                    var reader = new FileReader();
                    preview.innerHTML = null;
                    reader.addEventListener("load", function () {
                        var image = new Image();
                        image.height = 150;
                        image.title = file.name;
                        image.src = this.result;
                        preview.appendChild(image);
                    });
                    reader.readAsDataURL(file);
                }
                break;
        }
    })


    // NAME
    // [0] SERÍA EL PRIMER ITEM O PRIMER INPUT DEL FORM
    formproductadd.elements[1].addEventListener('blur', function () {
        // LO QUE ENTRE POR SWITCH ES SOMETIDO A CONDICIONES. AL FINAL HAY UNA EJECUCIÓN POR DEFECTO 
        switch (true) {
            // SI TAL INPUT ESTÁ VACÍO PONER MENSAJE DE ERROR EN ROJO
            case this.value.length < 5:
                this.classList.add('is-invalid');
                nameError.innerHTML = "Al menos 5 caracteres alfanuméricos";
                break;
            default:
                // SI NO ESTÁ VACÍO REMOVER TEXTO EN ROJO
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                nameError.innerHTML = null;
                break;
        }
    })

    // CATEGORY
    formproductadd.elements[2].addEventListener('blur', function () {
        switch (true) {
            case this.value < 1 || this.value > 2:
                this.classList.add('is-invalid');
                categoryError.innerHTML = "1 o 2 ";
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                categoryError.innerHTML = null;
                break;
        }
    })

    // size
    formproductadd.elements[3].addEventListener('blur', function () {
        switch (true) {
            case this.value == "":
                this.classList.add('is-invalid');
                priceError.innerHTML = "Valor mayor a 100";
                break;
            case this.value < 100:
                this.classList.add('is-invalid');
                priceError.innerHTML = "Valor mayor a 100";
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                priceError.innerHTML = null;
                break;
        }
    })

    // DISCOUNT
    formproductadd.elements[4].addEventListener('blur', function () {
        // CON false PUEDEN HACERSE RESTRICCIONES MAS ESTRICTAS
        // TODO ES false EXCEPTO ESTE case
        switch (true) {
            case this.value > 70: // SI ESTA CONDICION VERDADERA MOSTRAR ERROR
                this.classList.add('is-invalid');
                discountError.innerHTML = "Número entre 0 y 70";
                break;
            case this.value < 0: // SI ESTA CONDICION VERDADERA MOSTRAR ERROR
                this.classList.add('is-invalid');
                discountError.innerHTML = "Número entre 0 y 70";
                break;

            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                discountError.innerHTML = null;
                break;
        }
    })

    // DESCRIPTION
    formproductadd.elements[5].addEventListener('blur', function () {
        switch (true) {
            case (this.value.length < 20):
                this.classList.add('is-invalid');
                descriptionError.innerHTML = "Al menos 20 caracteres alfanuméricos";
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                descriptionError.innerHTML = null;
                break;
        }
    })

    // SECTION
    formproductadd.elements[6, 7, 8, 9, 10].addEventListener('blur', function () {
        switch (true) {
            case !this.value:
                this.classList.add('is-invalid');
                sectionError.innerHTML = "Elige una sección";
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                sectionError.innerHTML = null;
                break;
        }
    })

    // COLOR
    formproductadd.elements[8].addEventListener('blur', function () {
        switch (true) {
            case !this.value:
                this.classList.add('is-invalid');
                colorError.innerHTML = "Elige un color";
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                colorError.innerHTML = null;
                break;
        }
    })

    // SIZE
    formproductadd.elements[9].addEventListener('blur', function () {
        switch (true) {
            case !this.value:
                this.classList.add('is-invalid');
                sizeError.innerHTML = "Cuál es el talle del producto";
                break;
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                sizeError.innerHTML = null;
                break;
        }
    })

    // VERIFICAR SI HAY ERRORES RECORRIENDO ENTRADAS DE FORM 
    //DE formproductadd ESCUCHAR a  submit
    formproductadd.addEventListener('submit', function (e) {
        // PREVENIR ACCIÓN POR DEFECTO, DE submit (evniar)
        e.preventDefault();
        // error CONFIGURADO COMO false (no hay error)
        let error = false;
        // SI AGREGAS MAS ENTRADAS DE FORMULARIO...
        // O LAS QUITAS, O LAS VALIDAS CORRECTAMENTE, O, SE PORDRÍA RESTAR AQUI?...
        // RECORRER            elements             -3 RESTAR LOS ITEMS QUE NO ME INTERESA RECORRER. (los buttons)
        for (let i = 0; i < this.elements.length - 3; i++) {
            // SI    elements  CONTIENE               is-invalid   O        elements ES false
            if (this.elements[i].classList.contains('is-invalid') || !this.elements[i].value) {
                // error true (hay error)
                error = true
                // A elements AGREGAR        is-invalid (a cada element, a cada entrada de formulario)
                this.elements[i].classList.add('is-invalid');
                // EN errorEmpty PONER MENSAJE DE ERROR
                errorEmpty.innerHTML = "Todas las entradas de datos son requeridas, excepto: 'Descuento' y 'Sección' "
                // CAMBIA LOS BOTONES ESTILO DANGER! SI HAY ERRORES
                if (!this.elements[18].value) {
                    $('btnImagen').classList.remove('btn-outline-secondary')
                    $('btnImagen').classList.add('btn-outline-danger')
                }
            }
        }
        // SI NO HAY ERROR EJECUTAR ACCION NATIVA DEL submit button
        //  (js actual (2021) reemplaza if ternario...)
        !error && this.submit();
        // VERIFICAR SI HAY ERRORES RECORRIENDO ENTRADAS DE FORM /

    })




}







