const fs = require('fs');
const path = require('path');
let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));
module.exports = {
    index: (req, res) => {
        let productsOff = products.filter(index => {
            return index.discount !== 0 || '' || null;
        });
        let productsSugest = products.filter(index => {
            return index.category === 'sugest';
        })
        return res.render('general/index', {
            title: 'Roma - Venta de Indumentaria Textil',
            products,
            productsOff,
            productsSugest,

        });
    },
}


