/*

const db = require('../database/models');
const { Op, Sequelize } = require('sequelize');

module.exports = {
    //********************************* COMPROBAR AQUI DATOS DE DB ESTEN LLEGANDO BIEN
    index: (req, res) => {
        let sectionBanner = db.Section.findAll({
            include: [
                'image', // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
                // 'section',
                // 'category',
                // 'feature',
                // 'product',
                // 'cart',
                // 'rol'
            ]
        });
        Promise.all([sectionBanner])
            .then(([sectionBanner]) => {
                // let productsOff = products.filter(index => {
                //     return index.discount !== 0 || '' || null;
                // });
                // let productsSugest = products.filter(index => {
                //     return index.category === 'sugest';
                // })
                // let bannerImages = arrObjArrImages[0].bannerImages // TIRA ARRAY DE IMÁGENES ["img1", "img2", "img3"]   TAMBIÉN PODÍA MODIFICAR EL json COMO ARRAY DE IMÁGENES DIRECTAMENTE, Y NO COMO ARRAY DE OBJETOS QUE CONTIENEN ARRAYS....
                // // return res.send(bannerImages) //COMPROBAR
                // console.log(sectionBanner);
                return res.send(sectionBanner)
                return res.render('general/index', {
                    title: 'Roma - Venta de Indumentaria Textil',
                    products,
                    // productsOff,
                    // productsSugest,
                    // bannerImages,
                });
            })
            .catch(error => console.log(error))
        }
        //********************************* COMPROBAR AQUI DATOS DE DB ESTEN LLEGANDO BIEN /
    }
    
    */




const db = require('../database/models');
const { Op, Sequelize } = require('sequelize');

// const fs = require('fs');
// const path = require('path');
// let products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data', 'products.json'), 'utf-8'));
// let arrObjArrImages = JSON.parse(fs.readFileSync(path.join(__dirname, '../data', 'bannerSplide.json'), 'utf-8'));

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
            // attributes: {  exclude: ['id'] }, // FUNCIONA EXCLUYE LOS INDICADOS
            // attributes: ['name'], FUNCIONA EXCLUYE TODOS MENOS LOS INDICADOS
            where: { // OBTENER UN ARRAY DE OBJETOS MUY SIMILAR A ESTRUCTURA JSON ORIGINAL
                discount: {
                    [Op.gte]: 5,
                },
            },
            include: [{ //MAS CONVENIENTE
                raw: true,
                association: 'image',
                attributes: ['file'],

            }],
            // raw: true, // FUNCIONA. ARRAY PLANO
            // nest: true // FUNCIONA. MANTIENE EL OBJETO ANIDADO
        })
        let productCategory = db.Category.findAll({
            // raw: true,
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
                // return res.send(productCategory) //COMPROBAR
                // return res.send(bannerImages) //COMPROBAR
                // return res.send(productsOff) //COMPROBAR
                return res.render('general/index', {
                    title: 'Roma - Venta de Indumentaria Textil',
                    bannerImages, // LISTO. DB EN ACCION
                    productCategory,
                    productsOff, // TRANSICION JSON A DB: 1_RUTAS ACTUALIZADAS EN INDEX 2_LLEGUE DE DB DATOS CORRECTOS (igual o parecido como llegaba del JSON) 3_EXISTA ARCHIVO ENLAZADO (imagen en este caso)
                    // productsSugest, NUNCA SE USÓ
                    // products, // NUNCA SE USÓ
                });
            })
            .catch(error => console.log(error))



    },
}












// let sectionBanner = db.Section.findAll({
//     include: [
//         'image' // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
//     ]
// });
// Promise.all([sectionBanner])
//     .then(([sectionBanner]) => {
//         return res.send(sectionBanner)
//         return res.render('general/index', {
//             title: 'Roma - Venta de Indumentaria Textil',
//             products,
//             // productsOff,
//             // productsSugest,
//             // bannerImages,
//         });
//     })
//     .catch(error => console.log(error))




    // ****************************************************** VERSION JSON **************************************************************