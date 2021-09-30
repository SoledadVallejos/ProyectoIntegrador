var express = require('express');
var router = express.Router();

const { add, productDetail, edit, cart } = require('../controllers/productsController');

router.get('/productDetail', productDetail);
router.get('/cart', cart);




module.exports = router;