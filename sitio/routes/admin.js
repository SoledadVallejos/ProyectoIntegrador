var express = require('express');
var router = express.Router();

const { admin } = require('../controllers/adminController');

router.get('/', admin);





module.exports = router;





