var express = require('express');
var router = express.Router();

const { admin, edit, update, hastaLaVistaBeibi } = require('../controllers/adminController');

router.get('/', admin);

router.get('/edit/:id', edit);
router.put('/edit/:id', update);

router.get('/delete/:id', hastaLaVistaBeibi);




module.exports = router;





