const fs = require('fs');
const path = require('path');
// let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));

module.exports = {
    productDetail: (req, res) => {

    },
    cart: (req, res) => {
        return res.render('products/cart', {
            title: 'Tu carrito',

        });
    },
}
