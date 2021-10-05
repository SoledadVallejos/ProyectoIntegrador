const fs = require('fs');
const path = require('path');
let adminProducts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'))

module.exports = {
    productDetail: (req, res) => {
        let id = +req.params.id;
        let product = products[id]; // PRODUCTO ESPECÍFICO DINAMICO
        let productImg = products[id].imageSplide; // IMAGENES DE PRODUCTO ESPECÍFICO DINÁMICO
        // res.send(productImg); // COMPROBAR PRODUCTO ESPECÍFICO DINAMICO
        return res.render('products/productDetail', {
            title: 'Detalle del Producto',
            id,
<<<<<<< HEAD
            products,
            product,
            productImg,
=======
            adminProducts,

>>>>>>> 8eb05432a1ee1d6a30a1691763e0c95f7956ae15
        });
    },
    cart: (req, res) => {
        return res.render('products/cart', {
            title: 'Tu carrito',

        });
    },
}
