// DE A POCO IR AGREGANDO PEDAZOS DE CODIGO NUEVO PARA INCORPORAR DB
// AGREGAS Y COMPRUEBAS DATOS OBTENIDOS DESDE DB MEDIANTE return res.send()
// HACER COPIAS CUANDO LLEGUES A UN PUNTO DE PROGRESO FUNCIONANDO TODO !!!
// EL ORDEN Y CONCENTRACION ES IMPORTANTE!

const db = require('../database/models');
const { Op, Sequelize } = require('sequelize');
//       toThousand CONVIERTE NÚMEROS A MILES ( 1000 => 1.000)
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: (req, res) => {
        let sectionBanner = db.Section.findAll({
            where: {
                name: {
                    [Op.like]: 'banner'
                },
            },
            include: [
                'image' // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
            ]
        });
        let productDiscount = db.Product.findAll({
            where: { // OBTENER UN ARRAY DE OBJETOS MUY SIMILAR A ESTRUCTURA JSON ORIGINAL
                discount: {
                    [Op.gte]: 5,
                },
            },
            include: [{ //MAS CONVENIENTE
                raw: true, // AQUI SI ES UTIL. NO BORRARLO
                association: 'image', // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
                attributes: ['file'],
            }],
            // raw: true, // FUNCIONA. ARRAY PLANO
            // nest: true // FUNCIONA. MANTIENE EL OBJETO ANIDADO
            // attributes: {  exclude: ['id'] }, // FUNCIONA EXCLUYE LOS INDICADOS
            // attributes: ['name'], FUNCIONA EXCLUYE TODOS MENOS LOS INDICADOS
        })
        let productCategory = db.Category.findAll({
            include: [{
                association: 'image',
                attributes: ['file'],
            }],
        })
        Promise.all([sectionBanner, productDiscount, productCategory])
            .then(([sectionBanner, productDiscount, productCategory]) => {
                // bannerImages OBTENER DATOS TAL CUAL VENIA DE JSON
                let productsMap1 = sectionBanner.map(index => {
                    return index.image
                });
                let bannerImages = productsMap1[0].map(index => {
                    return index.file
                });
                // productsOff OBTENER DATOS TAL CUAL VENIA DE JSON
                let productsOff = productDiscount.map(index => {
                    return index
                });
                // productsOff  PARA SPLIDE
                let productsOffSplide = productDiscount.map(index => {
                    return index.image[0].file
                });
                // return res.send(productCategory) //COMPROBAR ANTES DE PROSEGUIR
                // return res.send(bannerImages) //COMPROBAR ANTES DE PROSEGUIR
                // return res.send(productDiscount1) //COMPROBAR ANTES DE PROSEGUIR
                // return res.send(productsOff) //COMPROBAR ANTES DE PROSEGUIR
                // TRANSICION JSON A DB: 1_RUTAS ACTUALIZADAS EN INDEX 2_LLEGUE DE DB DATOS CORRECTOS (igual o parecido como llegaba del JSON) 3_EXISTA ARCHIVO ENLAZADO (imagen en este caso)
                return res.render('general/index', {
                    title: 'Roma - Venta de Indumentaria Textil',
                    bannerImages, // LISTO. DB EN ACCION QUE EMOCION!! CONTIENE IMAGENES DEL BANNER
                    productCategory, // LISTO PARA MOSTRAR DATOS DE HOMBRE O MUJER...
                    productsOff, //LISTO. MUESTRA PRODUCTOS SOLO CON DESCUENTO EN HOME
                    productsOffSplide,
                    // productsSugest, NUNCA SE USÓ
                    // products, // NUNCA SE USÓ
                });

            })
            .catch(error => console.log(error))
    },
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
                // return res.send(searchResults); //COMPROBAR
                //             /general  OJO!! NO PONER BARRA!! NO FUNCIONA!!
                res.render('general/resultsHome', { // LAS COMPROBACIONES HACERLAS ANTES DE ESTE res.render()
                    searchResults,
                    toSearch,
                    toThousand,
                });
            })
            .catch(error => console.log(error))
    },


}