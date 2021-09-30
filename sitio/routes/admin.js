var express = require('express');
var router = express.Router();

const { adminAllProducts } = require('../controllers/adminController');

router.get('/', adminAllProducts);





module.exports = router;





