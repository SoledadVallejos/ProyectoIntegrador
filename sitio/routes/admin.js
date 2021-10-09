var express = require('express');
const path = require('path');
const multer = require('multer');

// CONFIG multer PARA CARGA DE ARCHIVOS (IMÁGENES EN ESTE CASO)
// adminImage
/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/admin-image'));
    },
    filename: (req, file, cb) => {
        console.log(file); // COMPROBAR EN TERMINAL (DONDE CORRE EL PUERTO) LA DATA DE LA IMÁGEN
        let newFilename = 'img-product-' + Date.now() + '-' + file.fieldname + '-' + path.basename(file.originalname);
        cb(null, newFilename);
    },
});
let upload = multer({ storage }); */
//SplideImages
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/productDetail-splide'));
    },
    filename: (req, file, cb) => {
        console.log(file); // COMPROBAR EN TERMINAL (DONDE CORRE EL PUERTO) LA DATA DE LA IMÁGEN
        let newsFilesName = file.fieldname + '-' + Date.now() + '-' + path.extname(file.originalname);
        cb(null, newsFilesName);
    },
});
let uploadMultiple = multer({ storage });

var router = express.Router();
const { admin, add, store, edit, update, hastaLaVistaBeibi, search } = require('../controllers/adminController');

router.get('/', admin);

router.get('/add', add);
router.post('/add', uploadMultiple.array('splideImages'), store);

router.get('/edit/:id', edit);
router.put('/update/:id', update);

router.get('/delete/:id', hastaLaVistaBeibi);
router.get('/search_results/', search);




module.exports = router;





