// REQUIRE
var express = require('express');
const path = require('path');
const multer = require('multer');
const uploadMultiple = require('../middlewares/multerProductsMiddleware')
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

var router = express.Router();
const { admin, add, store, edit, update, hastaLaVistaBeibi, search } = require('../controllers/adminController');

router.get('/', admin);

router.get('/add', add);
router.post('/add', uploadMultiple.array('splideImages'), store);

router.get('/edit/:id', edit);
router.put('/update/:id', uploadMultiple.array('splideImages'), update);

router.get('/delete/:id', hastaLaVistaBeibi);

//      admin/search_results  ESTA MISMA RUTA (app + admin.js) EN EL FORM
router.get('/search_results/', search);




module.exports = router;





