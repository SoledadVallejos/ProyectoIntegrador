const fs = require('fs');
const path = require('path');


module.exports = {
    add: (req, res) => {
        return res.render('products/add', {
            title: 'Añadir producto',

        });
    },
    productDetail: (req, res) => {
        return res.render('products/productDetail', {
            title: 'Detalle del Producto',

        });
    },
    edit: (req, res) => {
        return res.render('products/edit', {
            title: 'Editando producto',

        });
    },
    cart: (req, res) => {
        return res.render('products/cart', {
            title: 'Tu carrito',

        });
    },
/*     delete: (req, res) => {
        return res.render('products/cart', {
            title: 'Carrito',

        });
    }, */


}
