const fs = require('fs');
const path = require('path');

module.exports = {
    cart: (req, res) => {
        return res.render('products/cart', {
            title: 'Carrito',

        });
    },
}


