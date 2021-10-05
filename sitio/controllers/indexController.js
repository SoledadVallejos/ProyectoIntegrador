const fs = require('fs');
const path = require('path');
let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));
module.exports = {
    index: (req, res) => {
        let productsOff = products.filter(index => {
            return index.discount !== '' || null || 0;
        });
        let productsSugest = products.filter(index => {
            return index.category === 'sugest';
        })
        return res.render('general/index', {
            title: 'Roma - Venta de Indumentaria Textil',
<<<<<<< HEAD
            products,
            productsOff,
            productsSugest,
=======
            products: JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8')),
            admiProducts: JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'))
>>>>>>> 8eb05432a1ee1d6a30a1691763e0c95f7956ae15

        });
    },
}


