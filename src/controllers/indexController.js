// DE A POCO IR AGREGANDO PEDAZOS DE CODIGO NUEVO PARA INCORPORAR DB
// AGREGAS Y COMPRUEBAS DATOS OBTENIDOS DESDE DB MEDIANTE return res.send()
// HACER COPIAS CUANDO LLEGUES A UN PUNTO DE PROGRESO FUNCIONANDO TODO !!!
// EL ORDEN Y CONCENTRACION ES IMPORTANTE!

const db = require('../database/models');
const { Op, Sequelize } = require('sequelize');

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
}