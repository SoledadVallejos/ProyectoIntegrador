const path = require('path');
const db = require('../database/models');
const { validationResult } = require('express-validator');

module.exports = {

    //CREAR PRODUCTO
    add: (req, res) => {
        return res.render('admin/add');
    },

    store: (req, res) => {
        // ERRORES CAPTURARÁ ERRORES LISTOS PARA DEVOLVER POR PANTALLA
        let errors = validationResult(req);
        // SI NO HAY ERRORES
        if (errors.isEmpty()) {
            // CREAR PRODUCTO CON ESTOS DATOS QUE VIENEN DEL FORM
            db.Product.create({
                name: req.body.name.trim(),
                description: req.body.description.trim(),
                size: req.body.size,
                color: req.body.color,
                price: +req.body.price,
                discount: +req.body.discount,
                categoryId: req.body.category,
                sectionId: req.body.section,
            })
                // LUEGO CUANDO LO ANTERIOR TERMINE...
                .then(product => {
                    // EN imagesArr PONER IMAGENES PROVENIENTES DEL req.files DEL FORM
                    let imagesArr
                    if (req.files[0] != undefined) {
                        imagesArr = req.files.map(image => {
                            let img = {
                                file: image.filename,
                                productId: product.id
                            }
                            return img
                        });
                        // SI NO HAY IMAGENES
                    } else {
                        //EN imageArr PONER UNA POR DEFECTO
                        imagesArr = [{
                            file: "default.png",
                            productId: product.id
                        }]
                    }
                    // Y EN db.image PONERLAS O CREARLAS
                    db.Image.bulkCreate(imagesArr, { validate: true })
                        .then((result) => {
                            // FINALMENTE REDIRIGIR AL ADMIN
                            console.log('imagenes agregadas' + result)
                            // return res.send(imagesArr);//COMPROBAR
                            // return res.send(req.body);//COMPROBAR
                            return res.redirect('/admin');
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            // SI NO ESTÁ VACÍA DE ERRORES LA VARIABLE errors...(ARRIBA AL PRINCIPIO SE LA DEFINE)
        } else {
            // SOLICITAR DE NUEVO Product EN DB
            db.Product.findAll()
                // CUANDO DB RESPONDA...
                .then(products => {
                    console.log(errors); //  COMPROBAR
                    // // COMPROBABA OBTENER ARRAY DE EXTENSIONES PARA VALIDAR
                    // let exts = req.files.map(image => {
                    //     let img = path.extname(image.filename)
                    //     return img;
                    // });
                    // // COMPROBABA OBTENER ARRAY DE EXTENSIONES PARA VALIDAR /
                    // let ext = path.extname("a/b/splideImages-2021-12-9-211-1639087067534-.jpg");
                    // return res.send(exts);//COMPROBAR
                    // return res.send(req.files);//COMPROBAR
                    // return res.send(errors);//COMPROBAR
                    // return res.send(req.body);//COMPROBAR
                    // RENDERIZAR admin/add DE NUEVO ESTA VEZ, PARA MOSTRAR ERRORES EN EL LLENADO DE DATOS DEL FORM
                    res.render('admin/add', {
                        errors: errors.array(), // Errors COMO array DE ERRORES SI NO COMPLETA form 
                        old: req.body, // old: req.body RECORDAR VIEJO DATO INGRESADO
                        // oldFiles: req.files,
                    });
                })
                .catch(error => console.log(error))
        }

    }, //STORE /

    //EDITAR PRODUCTO
    edit: (req, res) => {
        let product = db.Product.findByPk(req.params.id, {
            include: [{ all: true }]
        })

        Promise.all([product])
            .then(([product]) => {
                // return res.send(product); // COMPROBAR SI VIENEN IMAGENES 
                return res.render('admin/edit', {
                    title: 'editar',
                    product,
                });
            })
            .catch(error => console.log(error))
    },
    update: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            console.log('no hubo errores')
            db.Product.update({
                name: req.body.name.trim(),
                description: req.body.description.trim(),
                size: req.body.size,
                color: req.body.color,
                price: +req.body.price,
                discount: +req.body.discount,
                categoryId: req.body.category, // ACA VIENE EL DATO DEL FORM EN "category". LUEGO, DATO! ÉNTRA EN DB EN LA COLUMNA "categoryId" ES LA ORDEN FINAL
                sectionId: req.body.section,
            },
                {
                    where: {
                        id: req.params.id
                    }
                })
                .then((productResult) => {
                    console.log('se edito producto: ' + productResult[0])
                   
                    return res.redirect('/admin')
                                  
    

                })
        } else {
            console.log('saltaron errores')
            let product = db.Product.findByPk(req.params.id,{
                include: [{ all: true }]
            })
            Promise.all([product])
                .then(([product]) => {
                    console.log('saltaron errores despues de consulta')
                    return res.render('admin/edit', {
                        product, // NECESARIO EN EDIT PARA DEVOLVER DATOS DE DB.
                        errors: errors.array(), // errors DISPONIBLES EN edit COMO EN add
                        old: req.body,
                    })
                })
                .catch(error => console.log(error))
        }

    },

    //LISTADO DE PRODUCTOS
    admin: (req, res) => {
        let products1 = db.Product.findAll({
            include: [ // SI
                'section',
                'category', // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
                'image',  // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
                'feature', // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
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
            // CON  include : [{all:true}] TRAIGO TODO DE UNA!
            include: [ // SI
                'section',
                'category',  // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
                'image', // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
                'feature', // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
            ]
        })
        Promise.all([products1])
            .then(([products1]) => {
                // let p1 = products1[0].name; // PROBANDO products1
                // var result = []; // PROBANDO un for en limpio...
                // for (let index = 0; index < products1.length; index++) {
                //     result += products1[index];
                // }
                // PROBANDO LLEGUEN DATOS MAPEADOS DE TODOS LOS ITEMS DE products1
                let feature = products1.map(index => {
                    return index.image[0].file
                })
                // PROBANDO LLEGUEN DATOS MAPEADOS DE TODOS LOS ITEMS DE products1 /
                // SEARCHER
                let toSearch = (req.query.keywords).toLowerCase();
                let searchResults = [];
                for (let i = 0; i < products1.length; i++) {
                    ((products1[i].name).toLowerCase()).includes(toSearch) ? searchResults.push(products1[i]) : '';
                    ((products1[i].description).toLowerCase()).includes(toSearch) ? searchResults.push(products1[i]) : '';
                    ((products1[i].color).toLowerCase()).includes(toSearch) ? searchResults.push(products1[i]) : '';
                    ((products1[i].section.name).toLowerCase()).includes(toSearch) ? searchResults.push(products1[i]) : '';
                    ((products1[i].category.name).toLowerCase()).includes(toSearch) ? searchResults.push(products1[i]) : '';
                    ((products1[i].category.description).toLowerCase()).includes(toSearch) ? searchResults.push(products1[i]) : '';
                    // ((products1[i].feature[i].name).toLowerCase()).includes(toSearch) ? searchResults.push(products1[i].feature[i]) : ''; // FALTA ANALIZAR
                }
                // FILTRAR REPETIDOS
                let hash = {};
                searchResults = searchResults.filter(function (current) {
                    let exists = !hash[current.id];
                    hash[current.id] = true;
                    return exists;
                });
                // FILTRAR REPETIDOS /
                // SEARCHER /
                // return res.send(products1); //COMPROBAR. PONELO AQUI!!! LUEGO DEL .then !!! ANTES DEL Promise .then DICE {pending} EN CONSOLA !!!
                // APARENTEMENTE feature NO FUNCIONA PORQUE NO SE INGRESAN CARACTERÍSTICAS (features) AL PRODUCTO DESDE add.ejs
                // return res.send(feature); //COMPROBAR. PONELO AQUI!!! LUEGO DEL .then !!! ANTES DEL Promise .then DICE {pending} EN CONSOLA !!!
                console.log(products1); //COMPROBAR. PONELO AQUI!!! LUEGO DEL .then !!! ANTES DEL Promise .then DICE {pending} EN CONSOLA !!!
                // return res.send(searchResults); //COMPROBAR
                //               /admin  OJO!! NO PONER BARRA AHÍ!! NO FUNCIONA!!
                res.render('admin/results', { // LAS COMPROBACIONES HACERLAS ANTES DE ESTE res.render()
                    searchResults,
                });
            })
            .catch(error => console.log(error))
    },
} //module.exports /






















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