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
        let errors = validationResult(req);
        if (errors.isEmpty()) {
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
                .then(product => {
                    let imagesArr

                    if (req.files[0] != undefined) {
                        imagesArr = req.files.map(image => {
                            let img = {
                                file: image.filename,
                                productId: product.id
                            }
                            return img
                        });


                    } else {
                        imagesArr = [{
                            file: "default.png",
                            productId: product.id
                        }]

                    }

                    db.Image.bulkCreate(imagesArr, { validate: true })
                        .then((result) => {
                            console.log('imagenes agregadas' + result)
                            return res.redirect('/admin')

                        })
                        .catch(error => console.log(error))


                })
                .catch(error => console.log(error))
        } else {
            db.Category.findAll()
                .then(categories => {
                    return res.render('productAdd', {
                        errors: errors.mapped(),
                        old: req.body
                    })
                })
                .catch(error => console.log(error))
        }
    },

    //EDITAR PRODUCTO
    edit: (req, res) => {
        let product = db.Product.findByPk(req.params.id)
        Promise.all([product])
            .then(([product]) => {
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
            const { name, description, size, color, price } = req.body;
            db.Product.update({
                name: name.trim(),
                description: description.trim(),
                size: size,
                color: color,
                price: price,
            },
                {
                    where: {
                        id: req.params.id
                    }
                })
                .then((productResult) => {
                    console.log('se edito producto: ' + productResult[0])
                    console.log(req.files);
                    if (typeof req.files[0] != "undefined") {
                        console.log('llegaron imagenes');
                        db.Image.destroy(
                            {
                                where: {
                                    productId: req.params.id
                                }
                            }
                        )
                            .then(() => {
                                let imagesArr = req.files.map(image => {
                                    let img = {
                                        file: image.filename,
                                        productId: req.params.id
                                    }
                                    return img
                                })
                                db.Image.bulkCreate(imagesArr, { validate: true })

                                    .then(() => {
                                        return res.redirect('/products/productDetail/' + req.params.id)
                                    })
                                    .catch(error => console.log(error))
                            })

                    } else {
                        console.log('edicion sin imagen')
                        return res.redirect('/products/productDetail/' + req.params.id)
                    }

                })
        } else {
            console.log('saltaron errores')
            let product = db.Product.findByPk(req.params.id)
            Promise.all([product])
                .then(([product]) => {
                    console.log('saltaron errores despues de consulta')
                    return res.render('edit', {
                        product,
                        errors: errors.mapped(),
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