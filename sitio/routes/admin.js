var express = require('express');
var router = express.Router();

const { admin, edit, update, hastaLaVistaBeibi, add } = require('../controllers/adminController');

router.get('/', admin);

router.get('/add', add)

router.get('/edit/:id', edit);
router.put('/update/:id', update);

router.get('/delete/:id', hastaLaVistaBeibi);




module.exports = router;





