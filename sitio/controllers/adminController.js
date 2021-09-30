const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));

module.exports = {
    admin: (req, res) => {
        return res.render('admin/admin', {
            title: 'Administración',
            products, // products: products
        });
    },


}


