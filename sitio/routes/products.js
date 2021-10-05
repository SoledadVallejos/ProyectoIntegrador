var express = require('express');
var router = express.Router();

const { productDetail, cart } = require('../controllers/productsController');

router.get('/productDetail/:id', productDetail);
router.get('/cart', cart);

router.post('/add'),
router.post('/add'),



module.exports = router;