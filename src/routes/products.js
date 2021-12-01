var express = require('express');
var router = express.Router();

const { productDetail, productsMan, productsWoman,  cart } = require('../controllers/productsController');

router.get('/productDetail/:id', productDetail);
router.get('/productsWoman/', productsWoman);
router.get('/productsMan/', productsMan);
router.get('/cart', cart);




module.exports = router;