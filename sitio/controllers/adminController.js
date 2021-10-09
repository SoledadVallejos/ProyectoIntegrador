const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {
    //CREAR PRODUCTO
    add: (req, res) => {
        return res.render('admin/add');

    },
    store: (req, res) => {
        const { name, description, price, colors, size, category, image, discount } = req.body;
        let product = {
            id: products[products.length - 1].id + 1,
            name: name.trim(),
            description: description.trim(),
            price: +price,
            discount: +discount,
            colors,
            size,
            category,
            image,
        };

        products.push(product)

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(products, null, 3), 'utf-8');

        // res.send(req.body); //COMPROBAR
        res.redirect('/admin');

    },

    //LISTADO DE PRODUCTOS
    admin: (req, res) => {
        return res.render('admin/admin', {
            title: 'Administración',
            products : JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
        });
    },

    //EDITAR PRODUCTO
    edit: (req, res) => {
        return res.render('admin/edit',
            {
                title: 'editar',
                product: products.find(product => product.id === +req.params.id)
            });
    },
    update: (req, res) => {

        const { name, description, price, color, size, image, category } = req.body;
        let product = products.find(product => product.id === +req.params.id);

        let productModified = {
            id: +req.params.id,
            name: name.trim(),
            description: description.trim(),
            price: +price,
            colors: color,
            size: size,
            category: category.trim(),
            image: product.image,
            features: product.features
        };

        let productsModified = products.map(product => product.id === +req.params.id ? productModified : product);

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(productsModified, null, 3), 'utf-8');


        res.redirect('/admin')

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

    search: (req, res) => {
        let toSearch = (req.query.keywords).toLowerCase();
        let searchResults = [];
        for (let i = 0; i < products.length; i++) {
            ((products[i].name).toLowerCase()).includes(toSearch) ? searchResults.push(products[i]) : "Nada encontrado";
            ((products[i].category).toLowerCase()).includes(toSearch) ? searchResults.push(products[i]) : 'Nada encontrado';
            ((products[i].colors).toLowerCase()).includes(toSearch) ? searchResults.push(products[i]) : 'Nada encontrado';
            ((products[i].description).toLowerCase()).includes(toSearch) ? searchResults.push(products[i]) : 'Nada encontrado';
        };
        //FILTRAR REPETIDOS
        let hash = {};
        searchResults = searchResults.filter(function (current) {
            let exists = !hash[current.id];
            hash[current.id] = true;
            return exists;
        });
        // console.log(JSON.stringify(searchResults)); //COMPROBAR

        // res.send(searchResults); //COMPROBAR
        res.render('admin/results', {
            searchResults,

        });
    },


}

// console.log(products); // COMPROBAR