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
    store : (req,res)=>{
        return res.send(req.body)

    },

    //LISTADO DE PRODUCTOS
    admin: (req, res) => {
        return res.render('admin/admin', {
            title: 'Administración',
            products : JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
        });
    },

    //EDITAR PRODUCTO
    edit: (req,res) => {
        return res.render('admin/edit',
    { title: 'editar',
           product : products.find(product => product.id === +req.params.id)});
},
    update: (req, res) => { 
        
        const {name,description,price,color,size,imagen,category} = req.body;
        let product = products.find(product => product.id === +req.params.id);

        let productModified = {
            id : +req.params.id,
            name : name.trim(),
            description : description.trim(),
            price : +price,
            colors: color,
            size: size,
            category : category.trim(),
            image : imagen,
            features : product.features};
    
            let productsModified = products.map(product => product.id === +req.params.id ? productModified : product);
    
            fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productsModified,null,3),'utf-8');
    
        
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
    }


}