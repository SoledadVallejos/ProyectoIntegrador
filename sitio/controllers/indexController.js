﻿const fs = require('fs');
const path = require('path');

module.exports = {
    index: (req, res) => {
        return res.render('products/index', {
            title: 'Roma - Venta de Indumentaria Textil',

        });
    },
}


