const fs = require('fs');
const path = require('path');
let products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data', 'products.json'), 'utf-8'))

module.exports = {
    productDetail: (req, res) => {
        let id = +req.params.id;
        let product = products[id]; // PRODUCTO ESPECÍFICO DINAMICO
        let productImg = products[id].splideImages; // IMAGENES DE PRODUCTO ESPECÍFICO DINÁMICO
        // res.send(productImg); // COMPROBAR PRODUCTO ESPECÍFICO DINAMICO
        return res.render('products/productDetail', {
            title: 'Detalle del Producto',
            id,
            products,
            product,
            productImg,
        });
    },
    cart: (req, res) => {
        return res.render('products/cart', {
            title: 'Tu carrito',

        });
    },
}
