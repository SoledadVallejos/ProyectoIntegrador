var express = require('express');
var router = express.Router();

const { productdetail } = require('../controllers/productdetailController');

router.get('/', productdetail);





module.exports = router;
