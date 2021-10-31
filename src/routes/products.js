var express = require('express');
var router = express.Router();

const { productDetail, cart } = require('../controllers/productsController');

router.get('/productDetail/:id', productDetail);
router.get('/cart', cart);




module.exports = router;