const fs = require('fs');
const path = require('path');
let adminProducts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'))

module.exports = {
    productDetail: (req, res) => {
        let id = +req.params.id;
        return res.render('products/productDetail', {
            title: 'Detalle del Producto',
            id,
            adminProducts,

        });
    },
    cart: (req, res) => {
        return res.render('products/cart', {
            title: 'Tu carrito',

        });
    },
}
