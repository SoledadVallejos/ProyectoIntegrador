// REQUIRE
var express = require('express');
const path = require('path');
const multer = require('multer');
// const guestMiddleware = require('../middlewares/guestMiddleware');

n = new Date();
//Año
y = n.getFullYear();
//Mes
m = n.getMonth() + 1;
//Día
d = n.getDate();
//Sec
s = n.getMilliseconds();
//Lo ordenas a gusto.
let fecha = y + "-" + m + "-" + d + "-" + s;
console.log(fecha);

//SplideImages
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/productDetail-splide'));
    },
    filename: (req, file, cb) => {
        console.log(file); // COMPROBAR EN TERMINAL (DONDE CORRE EL PUERTO) LA DATA DE LA IMÁGEN
        let newsFilesName = file.fieldname + '-' + fecha + '-' + Date.now() + '-' + path.extname(file.originalname);
        cb(null, newsFilesName);
    },
});
let uploadMultiple = multer({ storage });
//SplideImages/

var router = express.Router();
const { admin, add, store, edit, update, hastaLaVistaBeibi, search } = require('../controllers/adminController');

router.get('/',  admin);

router.get('/add', add);
router.post('/add', uploadMultiple.array('splideImages'), store);

router.get('/edit/:id', edit);
router.put('/update/:id', update);

router.get('/delete/:id', hastaLaVistaBeibi);
router.get('/search_results/', search);




module.exports = router;





