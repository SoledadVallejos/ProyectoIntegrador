const fs = require('fs');
const path = require('path');
// ESTAS VARIABLES ("products" y "producto") NO SE ESTAN USANDO... YA ESTA LEIDO EL JSON  ABAJO. SE PODRIAN BORRAR...
// let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));
// let producto = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'))
module.exports = {
    index: (req, res) => {
        return res.render('general/index', {
            title: 'Roma - Venta de Indumentaria Textil',
            products: JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8')),
            producto: JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'))

        });
    },
}


