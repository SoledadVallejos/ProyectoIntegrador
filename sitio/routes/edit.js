var express = require('express');
var router = express.Router();

const { edit } = require('../controllers/editController');

router.get('/', edit);





module.exports = router;