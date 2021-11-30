var express = require('express');
var router = express.Router();

const { index, search } = require('../controllers/indexController');
/* GET home page. */
router.get('/', index);
//                /sr/  ESTA MISMA RUTA (app + index.js) EN EL FORM
router.get('/sr/', search);





module.exports = router;
