const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));

module.exports = {
    //CREAR PRODUCTO
    add: (req, res) => {
        return res.render('admin/add', {
            // CODIGO
        });
    },
    //LISTADO DE PRODUCTOS
    adminAllProducts: (req, res) => {
        return res.render('admin/admin', {
            title: 'Administración',
            products, // products: products,
        });
    },
    //EDITAR PRODUCTO
    edit: (req, res) => {
        return res.render('admin/edit', {
            // CODIGO
        });
    },
    //ELIMINAR PRODUCTO
    delete: (req, res) => {
        return res.send('borrado');
        // CODIGO
    },


}


