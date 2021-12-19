// REQUIRE
var express = require('express');
const path = require('path');
const multer = require('multer');
//MIDDLEWARES
const uploadMultiple = require('../middlewares/multerProductsMiddleware')
// const guestMiddleware = require('../middlewares/guestMiddleware');
const validateAddEditProduct = require('../middlewares/validateAddEditProductMiddleware');
const validateEditProduct = require('../middlewares/validateEditProduct');

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

var router = express.Router();
const { admin, add, store, edit, update, hastaLaVistaBeibi, search } = require('../controllers/adminController');

router.get('/', admin);

router.get('/add', add);
// PARA QUE FUNCIONE MULTER ESTE   'splideImages'  DEBE SER EXACTAMENTE EL MISMO DEL <input name 'splideImages'  EN EL FORM SINO, ESTE ERROR TIRA: Unexpected field MulterError: Unexpected field
router.post('/add', uploadMultiple.array('splideImages'), validateAddEditProduct, store);

router.get('/edit/:id', edit);
router.put('/update/:id', validateEditProduct, update);

router.get('/delete/:id', hastaLaVistaBeibi);

//      admin/search_results  ESTA MISMA RUTA (app + admin.js) EN EL FORM
router.get('/search_results/', search);




module.exports = router;





