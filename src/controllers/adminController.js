const db = require('../database/models');
const { Op, Sequelize } = require('sequelize');
const { validationResult } = require('express-validator');

/* const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
 */
module.exports = {

    //CREAR PRODUCTO
    add: (req, res) => {
        return res.render('admin/add');
    },
    
    store: (req, res) => {
        let errors = validationResult(req);  // PULL ERRORS 
        if (errors.isEmpty()) {  // VALIDATE CONDITION FOR req.body
            db.Product.create({  //PUSH req.body INTO DB
                name: req.body.name.trim(), //ROMA
                description: req.body.description.trim(),
                size: req.body.size,
                color: req.body.color,
                price: +req.body.price,
                discount: +req.body.discount,
                categoryId: req.body.category,
                sectionId: req.body.section,
                // splideImages: imagesArr // ACÁ NO! ABAJO SI! / OR... NOT HERE! DOWN YES.  QUE TAL MI INGLÉS TÉCNICO EEEHH ITS VERY DIFICULT!
                // adminImage: req.file.filename, // CAPTURE AN IMAGE SINGLE
            })
                .then(product => { // THEN PUSH INTO THE product...
                    // return res.send(product) //COMPROBARRRRRRRRRRRRRRRRRRRRRRR ANTES DE PROSEGUIR //MUESTRA DATOS DEL FORMULARIO A INGRESAR EN DB
                    if (req.files[0] != undefined) {  // VALIDATE FORM DATA IMAGES IN req.files 
                        let imagesArr = req.files.map(image => { //FORM DATA. IMAGES OF req.files PUSH IN imagesArr ARRAY 
                            let img = {
                                file: image.filename,  // WRITE IMAGE FILE NAME IN file COLUMN INTO DB
                                productId: product.id // WRITE IMAGE ID IN productId COLUMN INTO DB
                            }
                            return img
                        });
                        db.Image.bulkCreate(imagesArr, { validate: true }) //  PUSH imagesArr INTO DB
                            .then(() => console.log('imagenes agregadas'))  // THEN... "joya! funcionó!"
                    }
                    // return res.send(product) //COMPROBARRRRRRRRRRRRRRRRRRRRRRR ANTES DE PROSEGUIR //MUESTRA DATOS INGRESADOS EN DB
                    return res.redirect('/admin') // RETURN admin IF ITS OK THE ABOVE
                })
                .catch(error => console.log(error))
        } else {  // ERRORS SHOW IF THE ABOVE FAILS
            db.Category.findAll()
                .then(categories => {
                    return res.render('productAdd', { // RENDER FORM DATA WITH ERRORS
                        // categories,
                        // firstLetter,
                        errors: errors.mapped(),
                        old: req.body
                    })
                })
                .catch(error => console.log(error))
        }
    },

    //EDITAR PRODUCTO
    edit: (req, res) => {
        let product = db.Product.findByPk(req.params.id) // ENCUENTRA PRODUCTO POR ID
        Promise.all([product])
            .then(([product]) => {
                // return res.send(product);
                return res.render('admin/edit', {
                    title: 'editar',
                    product,
                });
            })
            .catch(error => console.log(error))
    },
    update: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) { // VALIDACION
            const { name, description, size, color, price } = req.body; // req.body MUESTRA UNICO PRODUCTO SEGUN ID
            db.Product.update({ //PONER NUEVOS DATOS EN PRODUCTO ELEGIDO
                name: name,
                description: description.trim(),
                size: size, // FALTA CAPTURAR
                color: color, // FALTA CAPTURAR
                price: price,
                // discount: discount, // FALTA CAPTURAR
                // categoryId: category,
            },
                {
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => {
                    // return res.send(description)
                    return res.redirect('/admin') // REDIRIGE A ADMIN SI LA UPDATE SALIO BIEN
                })
        } else { // ERRORES MOSTRAR EN VISTAS
            let product = db.Product.findByPk(req.params.id) // TRAER DE NUEVO EL PRODUCTO PARA MOSTRAR ERRORES
            Promise.all([product]) // PIDE DE NUEVO PRODUCTO A LA DB
                .then(([product]) => {
                    return res.render('edit', {
                        product,
                        errors: errors.mapped(), //ERRORES ALMACENADOS EN ERRORS LISTOS PARA PASARSELOS A VISTAS
                    })
                })
                .catch(error => console.log(error))
        }

    },

    //LISTADO DE PRODUCTOS
    admin: (req, res) => {
        // let productimage = products[id] // Y ESTO?
        let products1 = db.Product.findAll({
            include: [ // SI
                'section',
                'category', // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
                'image' // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
            ]
        })
        Promise.all([products1])
            .then(([products1]) => {
                // return res.send(products1) //COMPROBARRRRRRRRRRRRRRRRRRRRRRR ANTES DE PROSEGUIR //MUESTRA DATOS INGRESADOS EN DB
                return res.render('admin/admin', {
                    title: 'Administración',
                    products1,
                });
            })
            .catch(error => console.log(error))
    },

    //ELIMINAR PRODUCTO DELETE DESTROY
    hastaLaVistaBeibi: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id,
            }
        })
            .then(() => {
                return res.redirect('/admin')
            })
            .catch(error => console.log(error))
    },

    // SEARCH
    // ORDENÉ TODO COMO MEJOR PUDE ENTENDER. NO FUNCIONÓ, PROBÉ OTRO MÉTODO, Y OTRO...
    // FINALMENTE VOLVÍ AL PRIMER MÉTODO LO PROBÉ DE NUEVO... Y FUNCIONÓ!!! QUE PASO?
    search: (req, res) => {
        let products1 = db.Product.findAll({
            include: [ // SI
                'section',
                'category', // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
                'image' // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
            ]
        })
        Promise.all([products1])
            .then(([products1]) => {
                // let p1 = products1[0].name; // PROBANDO products1
                // var result = []; // PROBANDO un for en limpio...
                // for (let index = 0; index < products1.length; index++) {
                //     result += products1[index];
                // }
                let toSearch = (req.query.keywords).toLowerCase();
                let searchResults = [];
                for (let i = 0; i < products1.length; i++) {
                    ((products1[i].name).toLowerCase()).includes(toSearch) ? searchResults.push(products1[i]) : "Nada encontrado";
                    // ((products1[i].category.description).toLowerCase()).includes(toSearch) ? searchResults.push(products1[i].category.description) : 'Nada encontrado'; // FALTA RESOLVER
                    ((products1[i].description).toLowerCase()).includes(toSearch) ? searchResults.push(products1[i]) : 'Nada encontrado';
                    ((products1[i].color).toLowerCase()).includes(toSearch) ? searchResults.push(products1[i]) : 'Nada encontrado';
                }
                // FILTRAR REPETIDOS
                let hash = {};
                searchResults = searchResults.filter(function (current) {
                    let exists = !hash[current.id];
                    hash[current.id] = true;
                    return exists;
                });
                // return res.send(categories); //COMPROBAR. PONELO AQUI!!! LUEGO DEL .then !!! ANTES DEL Promise .then DICE {pending} EN CONSOLA !!!
                // console.log(products1); //COMPROBAR. PONELO AQUI!!! LUEGO DEL .then !!! ANTES DEL Promise .then DICE {pending} EN CONSOLA !!!
                // return res.send(toSearch); //COMPROBAR
                res.render('admin/results', { // LAS COMPROBACIONES HACERLAS ANTES DE ESTE res.render()
                    searchResults,
                });
            })
            .catch(error => console.log(error))
    },
} //module.exports /


// console.log(products); // COMPROBAR



/*
// < !--REPASANDO ARRAYS... -->
// < !--index.splideImages[0] USANDO foreach-->
// PARA ACCEDER A VALORES DE ARRAY,ESTE DEBE TENER NOMBRE (SIN USAR foreach)
products =
    [
        {
            "id": 0,
            "name": "Polera Roja",
            "description": "Polera de mujer Roma",
            "image": "img-producto-polera-rojo1.jpg",
            "splideImages": [
                "img-producto-polera-rojo1.jpg",
                "img-producto-polera-rojo2.jpg",
                "img-producto-polera-rojo3.jpg",
                "img-producto-polera-rojo4.jpg"
            ],
            "category": "Oferta",
            "size": 38,
            "color": "Rojo",
            "price": "3950",
            "discount": 30
        },
        {
            "id": 1,
            "name": "Polera Blanca",
            "description": " Aprovechala YA! Es la última en stock!",
            "image": "img-producto-polera-blanco1.jpg",
            "splideImages": [
                "img-producto-polera-blanco1.jpg",
                "img-producto-polera-blanco2.jpg"
            ],
            "category": "sugest",
            "size": 40,
            "color": "Blanco",
            "price": 1900,
            "discount": 10
        }
    ]
//                   index.     .splideImages[0]   // USANDO foreach, index REPRESENTA CADA ÍNDICE DE ARRAY ITERADO
console.log(products[0].splideImages[0]); // ACCEDIENDO A VALOR DE ARRAY SIN ITERAR
//               products[0]                                DEBE NOMBRARSE PRIMERO NOMBRE ARRAY + ÍNDICE QUE SE QUIERE ACCEDER...
//                                 .splideImages           ES NOMBRE DEL ÚLTIMO SUBGRUPO DE ÍNDICES
//                                                     [0]        ES EL ÍNDICE ESPECÍFICO AL CUAL QUIERO ACCEDER PARA MOSTRAR SU VALOR FINALMENTE
// IMPRIME: img-producto-polera-rojo1.jpg

*/