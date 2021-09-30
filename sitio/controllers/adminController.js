const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {
    //CREAR PRODUCTO
    add: (req, res) => {
        return res.render('admin/add', {
            // CODIGO
        });
    },
    //LISTADO DE PRODUCTOS
    admin: (req, res) => {
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
    update: (req, res) => {
        // CODIGO
    },

    //ELIMINAR PRODUCTO
    hastaLaVistaBeibi: (req, res) => {
        let id = +req.params.id;
        let productsMenosUno = products.filter(index => {
            return id !== index.id;
        });
        // return res.send(productsMenosUno); //COMPROBAR
        let productsUpdate = JSON.stringify(productsMenosUno, null, 3);
        fs.writeFileSync(productsFilePath, productsUpdate, 'utf-8');
        res.redirect('/admin')
    },


}


