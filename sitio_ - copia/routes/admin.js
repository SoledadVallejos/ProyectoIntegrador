var express = require('express');
var router = express.Router();

const { admin, add, store, edit, update, hastaLaVistaBeibi, search } = require('../controllers/adminController');

router.get('/', admin);

router.get('/add', add);
router.post('/add', store)

router.get('/edit/:id', edit);
router.put('/update/:id', update);

router.get('/delete/:id', hastaLaVistaBeibi);
router.get('/search_results/', search);




module.exports = router;





