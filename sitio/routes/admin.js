var express = require('express');
var router = express.Router();

const { admin, edit, update, hastaLaVistaBeibi, add, store } = require('../controllers/adminController');

router.get('/', admin);

router.get('/add', add);
router.post('/add', store)

router.get('/edit/:id', edit);
router.put('/update/:id', update);

router.get('/delete/:id', hastaLaVistaBeibi);




module.exports = router;





