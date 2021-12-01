const db = require('../database/models');
const { Op, Sequelize } = require('sequelize');

module.exports = {

    productDetail: (req, res) => {
        let product = db.Product.findByPk(req.params.id, {
            include: [{
                association: 'image',
                attributes: ['file'],
            }],
        })
        Promise.all([product])
            .then(([product]) => {
                //----------------------CAMBIAR SUMINISTRO DE DATOS DE JSON A DB  UNO A UNO POCO A POCO 
                //----------------------COMPROBAR EN productImg LLEGUE DE DB DATOS MUY SIMILARES COMO LLEGABA DEL JSON
                // EXTREAER IMAGENES DE DB Y PONERLO EN productImg PARA CONSUMO DE  SLIDE EN  productDetail.ejs
                let productImg = product.image.map(element => {// IMAGENES DE PRODUCTO ESPECÍFICO DINÁMICO SEGUN EL Iid PUESTO EN URI
                    return element.file
                })
                // return res.send(productImg); // COMPROBAR DATOS ANTES!
                // return res.send(product); // COMPROBAR DATOS ANTES!
                return res.render('products/productDetail', {
                    title: 'Detalle del Producto',
                    product, // BIEN... PARA MOSTRAR DETALLES DEL PRODUCTO
                    productImg, //BIEN... PARA EL SLIDE DEL DETALLE
                });
            })
            .catch(error => console.log(error))
    },

    productsWoman: (req, res) => {
        let products = db.Product.findAll({
            include: [ // SI
                'section',
                'category', // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
                'image' // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
            ]
        })
        Promise.all([products])
            .then(([products]) => {
                // return res.send(products) //COMPROBARRRRRRRRRRRRRRRRRRRRRRR ANTES DE PROSEGUIR //MUESTRA DATOS INGRESADOS EN DB
                return res.render('products/productsWoman', {
                    title: 'Ropa Mujer',
                    products,
                });
            })
            .catch(error => console.log(error))
    },

    productsMan: (req, res) => {
        let products = db.Product.findAll({
            include: [ // SI
                'section',
                'category', // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
                'image' // TAL CUAL ESTA PUESTO EN as: 'image' EN MODELO
            ]
        })
        Promise.all([products])
            .then(([products]) => {
                // return res.send(products) //COMPROBARRRRRRRRRRRRRRRRRRRRRRR ANTES DE PROSEGUIR //MUESTRA DATOS INGRESADOS EN DB
                return res.render('products/productsMan', {
                    title: 'Ropa Hombre',
                    products,
                });
            })
            .catch(error => console.log(error))
    },

    cart: (req, res) => {
        return res.render('products/cart', {
            title: 'Tu carrito',

        });
    },
}
