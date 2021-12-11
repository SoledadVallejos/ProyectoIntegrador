﻿const path = require('path');
const { body, check } = require('express-validator');

module.exports = [
    // body('')  ES MÁS CONFIABLE. VINCULADO A error.param=='color'
    body('name') // VINCULADO A error.param=='name'
        .notEmpty().withMessage('Nombre de producto es necesario').bail() // bail() TIRA ERROR Y CORTA. NECESARIO PARA EVITAR ERROR: "value invalid"
        .isLength({ min: 5 }).withMessage('Mínimo 5 caracteres').bail()
        .matches('^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$').withMessage('Solo se permite un espacio entre palabras'),
    body('category')
        .notEmpty().withMessage('Categoría del producto es necesario').bail()
        .isNumeric().withMessage('1 o 2: 1=Hombre 2=Mujer').bail()
        .matches('[1-2]').withMessage('1 o 2: 1=Hombre 2=Mujer').bail()
        .isLength({ max: 1 }).withMessage('1 o 2: 1=Hombre 2=Mujer'),
    body('price')
        .notEmpty().withMessage('Precio de producto es necesario').bail()
        .isNumeric().withMessage('Solo números').bail()
        .isLength({ min: 2 }).withMessage('2 a 10 dígitos').bail()
        .isLength({ max: 10 }).withMessage('2 a 10 dígitos').bail()
        .matches('[^0]').withMessage('No se permite valor 0').bail()
        //                                                                           NO 0     / NULL
        //                                                                                 0 A LA IZQUIERDA NO PERMITIDO
        .custom((value, { req }) => (value === value.replace(/^0+/, ''))).withMessage('Los ceros de la izquierda no se permiten').bail()
        .custom((value, { req }) => (value >= 100)).withMessage('Más de 100'),
    body('discount')
        // .isNumeric().withMessage('Número entre 5 y 70').bail()
        // .isLength({ max: 2 }).withMessage('Número entre 5 y 70').bail()
        // .matches('[^0]').withMessage('No se permite valor 0').bail()
        //                                                                                 0 A LA IZQUIERDA NO PERMITIDO
        .custom((value, { req }) => (value === value.replace(/^0+/, ''))).withMessage('Ceros a la izquierda o valor 0 no es permitido').bail()
        .custom((value, { req }) => (value >= 5 && value <= 70 || value == '' || value === 0)).withMessage('Vacío o número entre 5 y 70').bail()
        .trim(),
    body('color') //check OTRA FORMA DE VALIDAR...  VINCULADO A error.param=='color'
        .notEmpty().withMessage('Color del producto es necesario'),
    check('size') //check OTRA FORMA DE VALIDAR... 
        .notEmpty().withMessage('Talle del producto es necesario'),
    body('description')
        .notEmpty().withMessage('Descripción del producto es necesario').bail()
        .matches(`^[a-zA-Z0-9_()"!¡'¿?.,:áéíóúÁÉÍÓÚ]+( [a-zA-Z0-9_()"!¡'¿?.,:áéíóúÁÉÍÓÚ]+)*$`).withMessage('Solo un espacio entre palabras. Se puede incluir caracteres básicos de escritura').bail()
        .isLength({ min: 20 }).withMessage('Al menos 20 caracteres'),
    body('splideImages')
        // .MI PROPIA VALIDATION FUNCTION
        .custom((value, { req }) => {
            // EN file req.files(imágenes) PONER ARCHIVOS CARGADOS POR EL USUARIO
            let file = req.files;
            // EN acceptedExtensions PONER EXTENSIONES DE IMÁGENES PERMITIDAS
            let acceptedExtensions = ['.jpg', '.png', '.gif'];
            // VERIFICA QUE HAYA ARCHIVOS CARGADOS
            // SI file ESTÁ VACÍO O INDEFINIDO...
            if (file == '') {
                // TIRAR ESTE ERROR
                throw new Error('Al menos una imágen de producto es necesario');
                // VERIFICA ARCHIVOS CARGADOS SEAN LOS PERMITIDOS
                // SI NO HAY ERROR ARRIBA (si hay archivos cargados)
            } else {
                // EN exts PONER EXTENSIÓN DE ARCHIVOS CARGADOS
                let exts = req.files.map(image => {
                    let img = path.extname(image.filename)
                    return img;
                });
                // SI acceptedExtensions NO INCLUYE EXTENSIÓNES DE ARCHIVO PERMITIDOS...
                for (let i = 0; i < exts.length; i++) {
                    if (!acceptedExtensions.includes(exts[i])) {
                        // TIRA ERROR INFORMANDO EXTENSIONES PERMITIDAS
                        throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                    }

                }




            }
            // SI VERFICACIONES DE ARRIBA RESULTAN EN "true" 
            // O SEA, HAY ARCHIVOS CARGADOS Y SI ESTOS SON LOS PERMITIDOS 
            // ESTE MIDDLEWARE PERMITE SIGA EJECUTANDO PASANDO A LA CREACIÓN DE PRODUCTO
            // RETORNANDO true
            return true;
        })



]

