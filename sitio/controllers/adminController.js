const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '..', 'data', 'adminProducts.json');
const adminProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let  categorias = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','categorias.json'),'utf-8'));
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
<<<<<<< HEAD
            products,
=======
            adminProducts : JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
>>>>>>> 8eb05432a1ee1d6a30a1691763e0c95f7956ae15
        });
    },

    
    
    




    //EDITAR PRODUCTO
    edit: (req, res) => {
        return res.render('admin/edit',
<<<<<<< HEAD
            {
                title: 'editar',
                product: products.find(product => product.id === +req.params.id)
            });
    },
    update: (req, res) => {

        const { name, description, price, color, size, image, category } = req.body;
        let product = products.find(product => product.id === +req.params.id);
=======
    { title: 'editar',
           adminProducts : products.find(product => product.id === +req.params.id)});
},
    update: (req, res) => { 
        
        const {name,description,price,color,size,imagen,category} = req.body;
        let adminProducts = products.find(product => product.id === +req.params.id);
>>>>>>> 8eb05432a1ee1d6a30a1691763e0c95f7956ae15

        let productModified = {
            id: +req.params.id,
            name: name.trim(),
            description: description.trim(),
            price: +price,
            colors: color,
            size: size,
<<<<<<< HEAD
            category: category.trim(),
            image: image,
            features: product.features
        };

        let productsModified = products.map(product => product.id === +req.params.id ? productModified : product);

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(productsModified, null, 3), 'utf-8');


=======
            category : category.trim(),
            image : imagen,
            features : product.features};
    
            let productsModified = adminProducts.map(product => product.id === +req.params.id ? productModified : product);
    
            fs.writeFileSync(path.join(__dirname,'..','data','adminProducts.json'),JSON.stringify(productsModified,null,3),'utf-8');
    
        
>>>>>>> 8eb05432a1ee1d6a30a1691763e0c95f7956ae15
        res.redirect('/admin')

    },


    //ELIMINAR PRODUCTO
    hastaLaVistaBeibi: (req, res) => {
        let id = +req.params.id;
        let productsMenosUno = products.filter(product => {
            return id !== product.id;
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