// NECESARIOCART

// DE A POCO IR AGREGANDO PEDAZOS DE CODIGO NUEVO PARA INCORPORAR DB
// AGREGAS Y COMPRUEBAS DATOS OBTENIDOS DESDE DB MEDIANTE return res.send()
// HACER COPIAS CUANDO LLEGUES A UN PUNTO DE PROGRESO FUNCIONANDO TODO !!!
// EL ORDEN Y CONCENTRACION ES IMPORTANTE!

const db = require('../database/models');
const { Op, Sequelize } = require('sequelize');
//       toThousand CONVIERTE NÚMEROS A MILES ( 1000 => 1.000)
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// SHUFFLE ARRAY RANDOMIZA UN ARRAY
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}
// Used like so
// var arr = [2, 11, 37, 42];
// shuffle(arr);
// console.log(arr);
// SHUFFLE ARRAY RANDOMIZA UN ARRAY /

module.exports = {
    index: (req, res) => {
        let products = db.Product.findAll({
            include: [{ all: true }]
        })
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
        Promise.all([sectionBanner, productDiscount, productCategory, products])
            .then(([sectionBanner, productDiscount, productCategory, products]) => {
                // bannerImages OBTENER DATOS TAL CUAL VENIA DE JSON
                let productsMap1 = sectionBanner.map(index => {
                    return index.image
                });
                let bannerImages = productsMap1[0].map(index => {
                    return index.file
                });
                // PASADO
                // productsOff OBTENER DATOS TAL CUAL VENIA DE JSON
                // let productsOff = productDiscount.map(index => {
                //     return index
                // });
                // productsOff  PARA SPLIDE
                // let productsOffSplide = productDiscount.map(index => {
                //     return index.image[0].file
                // });
                // PASADO /

                // SECCIONES EN HOME
                let productsMuchSale = products.filter(product => {
                    return product.section.name === 'Más vendidos';
                })
                shuffle(productsMuchSale)
                let productsPromo = products.filter(product => {
                    return product.section.name === 'Promoción';
                })
                shuffle(productsPromo)
                let productsOff = products.filter(product => {
                    return product.section.name === 'Ofertas';
                })
                shuffle(productsOff)
                let productsClearance = products.filter(product => {
                    return product.section.name === 'Liquidación';
                })
                shuffle(productsClearance)
                let productsLastView = products.filter(product => {
                    return product.section.name === 'Últimos vistos';
                })
                shuffle(productsLastView)
                // SECCIONES EN HOME /


                // return res.send(productsMuchSale) // COMPROBAR
                // return res.send(products); //COMPROBAR products
                // return res.send(productCategory) //COMPROBAR ANTES DE PROSEGUIR
                // return res.send(bannerImages) //COMPROBAR ANTES DE PROSEGUIR
                // return res.send(productDiscount1) //COMPROBAR ANTES DE PROSEGUIR
                // return res.send(productsOff) //COMPROBAR ANTES DE PROSEGUIR
                // return res.send(productsOffSplide) //COMPROBAR ANTES DE PROSEGUIR
                // TRANSICION JSON A DB: 1_RUTAS ACTUALIZADAS EN INDEX 2_LLEGUE DE DB DATOS CORRECTOS (igual o parecido como llegaba del JSON) 3_EXISTA ARCHIVO ENLAZADO (imagen en este caso)
                req.session.carrito=[]; // COMPROBAR QUE carrito TENGA session (se ve en consola de navegador home)
                console.log('carrito', req.session.carrito);
                return res.render('general/index', {
                    title: 'Roma - Venta de Indumentaria Textil',
                    products,
                    bannerImages, // LISTO. DB EN ACCION QUE EMOCION!! CONTIENE IMAGENES DEL BANNER
                    productCategory, // LISTO PARA MOSTRAR DATOS DE HOMBRE O MUJER...
                    productsMuchSale,
                    productsPromo,
                    productsOff,
                    productsClearance,
                    productsLastView,
                    // productsOff, //LISTO. MUESTRA PRODUCTOS SOLO CON DESCUENTO EN HOME
                    // productsOffSplide,
                    // productsSugest, NUNCA SE USÓ
                    // products, // NUNCA SE USÓ
                });

            })
            .catch(error => console.log(error))
    },

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