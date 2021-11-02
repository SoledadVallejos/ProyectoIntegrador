const fs = require('fs');
const path = require('path');
let products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data', 'products.json'), 'utf-8'));
let arrObjArrImages = JSON.parse(fs.readFileSync(path.join(__dirname, '../data', 'bannerSplide.json'), 'utf-8'));

module.exports = {
    index: (req, res) => {
        let productsOff = products.filter(index => {
            return index.discount !== 0 || '' || null;
        });
        let productsSugest = products.filter(index => {
            return index.category === 'sugest';
        })
        let bannerImages = arrObjArrImages[0].bannerImages // TIRA ARRAY DE IMÁGENES ["img1", "img2", "img3"]   TAMBIÉN PODÍA MODIFICAR EL json COMO ARRAY DE IMÁGENES DIRECTAMENTE, Y NO COMO ARRAY DE OBJETOS QUE CONTIENEN ARRAYS....
        // return res.send(bannerImages) //COMPROBAR
        return res.render('general/index', {
            title: 'Roma - Venta de Indumentaria Textil',
            products,
            productsOff,
            productsSugest,
            bannerImages,
        });
    },
}


