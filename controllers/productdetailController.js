const fs = require('fs');
const path = require('path');

module.exports = {
    productdetail: (req, res) => {
        return res.render('productdetail', {
            title: 'Detalle del Producto',

        });
    },
}


