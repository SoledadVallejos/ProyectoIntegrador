var express = require('express');
var router = express.Router();

const { cart } = require('../controllers/cartController');

router.get('/', cart);





module.exports = router;
