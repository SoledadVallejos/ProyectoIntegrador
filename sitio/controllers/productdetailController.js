const fs = require('fs');
const path = require('path');

module.exports = {
    productdetail: (req, res) => {
        return res.render('products/productdetail', {
            title: 'Detalle del Producto',

        });
    },
}


