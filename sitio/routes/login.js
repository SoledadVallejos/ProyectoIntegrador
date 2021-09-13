var express = require('express');
var router = express.Router();

const { login } = require('../controllers/loginController');

router.get('/', login);





module.exports = router;
