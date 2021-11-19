const db = require('../database/models');
const { Op, Sequelize } = require('sequelize');

// ELIMINAR O COMENTAR UNA VEZ RESUELTO CONSUMO DATOS DE DE DB 
// const fs = require('fs');
// const path = require('path');
// let products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data', 'products.json'), 'utf-8'))

module.exports = {
    productDetail: (req, res) => {
        let products = db.Product.findAll({
            include: [{
                association: 'image',
                attributes: ['file'],
            }],
        })
        Promise.all([products])
            .then(([products]) => {
                //----------------------CAMBIAR SUMINISTRO DE DATOS DE JSON A DB  UNO A UNO POCO A POCO 
                let id = +req.params.id - 1; // PONGO -1 PARA CORREGIR INCOINCIDENCIA ENTRE id Y GRUPOD DE IMAGENES DEL SLIDE EN  productDetail.ejs
                //----------------------COMPROBAR EN productImg LLEGUE DE DB DATOS MUY SIMILARES COMO LLEGABA DEL JSON
                // EXTREAER IMAGENES DE DB Y PONERLO EN productImg PARA CONSUMO DE  SLIDE EN  productDetail.ejs
                let productImgsById = products[id].image; // IMAGENES DE PRODUCTO ESPECÍFICO DINÁMICO SEGUN EL Iid PUESTO EN URI
                let productImg = productImgsById.map(element => {
                    return element.file
                })
                // return res.send(productImg); // COMPROBAR DATOS ANTES!
                // return res.send(product); // COMPROBAR DATOS ANTES! 
                // return res.send(productImg); // COMPROBAR DATOS ANTES!
                // return res.send(products)// COMPROBAR DATOS ANTES!
                return res.render('products/productDetail', {
                    title: 'Detalle del Producto',
                    id, //BIEN... PARA MOSTRAR PRODUCTO SEGUN EL id DEL URI
                    products, // BIEN... PARA MOSTRAR DETALLES DEL PRODUCTO
                    productImg, //BIEN... PARA EL SLIDE DEL DETALLE
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
