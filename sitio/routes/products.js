var express = require('express');
var router = express.Router();

const { add, productDetail, edit, cart } = require('../controllers/productsController');

//TODO ESTO IRÍA EN ADMIN?...
// router.get('/', productsAll);
router.get('/add', add);
router.get('/productDetail', productDetail);
router.get('/edit', edit);
// router.get('/:id/delete', delete);

//cart IRÍA EN UN NUEVO GRUPO TIPO ventas?
router.get('/cart', cart);




module.exports = router;