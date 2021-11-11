const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {

    //CREAR PRODUCTO
    add: (req, res) => {
        return res.render('admin/add');
    },
    store: (req, res) => {
        // const { name, description, price, color, size, category, image, discount } = req.body;
        let imagesArr = req.files.map(images => {
            return images.filename
        });
        let product = {
            id: products[products.length - 1].id + 1,
            name: req.body.name.trim(),
            description: req.body.description.trim(),
            price: +req.body.price,
            discount: +req.body.discount,
            color: req.body.color,
            size: req.body.size,
            category: req.body.category,
            splideImages: imagesArr,
            // adminImage: req.file.filename, // CAPTURA UNA single IMAGE
        };
        // return res.send(products); //COMPROBAR
        products.push(product)
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(products, null, 3), 'utf-8');
        res.redirect('/admin');
    },

    //LISTADO DE PRODUCTOS
    admin: (req, res) => {
        // let productimage = products[id]
        return res.render('admin/admin', {
            title: 'Administración',
            products,
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
            color: color,
            size: size,
            category: category.trim(),
            image: image,
            features: product.features
        };

        let productsModified = products.map(product => product.id === +req.params.id ? productModified : product);

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(productsModified, null, 3), 'utf-8');


        res.redirect('/admin')

    },

    //ELIMINAR PRODUCTO DELETE DESTROY
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
            ((products[i].color).toLowerCase()).includes(toSearch) ? searchResults.push(products[i]) : 'Nada encontrado';
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



/*
// < !--REPASANDO ARRAYS... -->
// < !--index.splideImages[0] USANDO foreach-->
// PARA ACCEDER A VALORES DE ARRAY,ESTE DEBE TENER NOMBRE (SIN USAR foreach)
products =
    [
        {
            "id": 0,
            "name": "Polera Roja",
            "description": "Polera de mujer Roma",
            "image": "img-producto-polera-rojo1.jpg",
            "splideImages": [
                "img-producto-polera-rojo1.jpg",
                "img-producto-polera-rojo2.jpg",
                "img-producto-polera-rojo3.jpg",
                "img-producto-polera-rojo4.jpg"
            ],
            "category": "Oferta",
            "size": 38,
            "color": "Rojo",
            "price": "3950",
            "discount": 30
        },
        {
            "id": 1,
            "name": "Polera Blanca",
            "description": " Aprovechala YA! Es la última en stock!",
            "image": "img-producto-polera-blanco1.jpg",
            "splideImages": [
                "img-producto-polera-blanco1.jpg",
                "img-producto-polera-blanco2.jpg"
            ],
            "category": "sugest",
            "size": 40,
            "color": "Blanco",
            "price": 1900,
            "discount": 10
        }
    ]
//                   index.     .splideImages[0]   // USANDO foreach, index REPRESENTA CADA ÍNDICE DE ARRAY ITERADO
console.log(products[0].splideImages[0]); // ACCEDIENDO A VALOR DE ARRAY SIN ITERAR
//               products[0]                                DEBE NOMBRARSE PRIMERO NOMBRE ARRAY + ÍNDICE QUE SE QUIERE ACCEDER...
//                                 .splideImages           ES NOMBRE DEL ÚLTIMO SUBGRUPO DE ÍNDICES
//                                                     [0]        ES EL ÍNDICE ESPECÍFICO AL CUAL QUIERO ACCEDER PARA MOSTRAR SU VALOR FINALMENTE
// IMPRIME: img-producto-polera-rojo1.jpg

*/