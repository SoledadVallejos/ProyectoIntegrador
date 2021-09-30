const fs = require('fs');
const path = require('path');


module.exports = {
    productDetail: (req, res) => {
        return res.render('products/productDetail', {
            title: 'Detalle del Producto',

        });
    },
    cart: (req, res) => {
        return res.render('products/cart', {
            title: 'Tu carrito',

        });
    },
}
