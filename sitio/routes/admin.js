var express = require('express');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img'));
    },
    filename: (req, file, cb) => {
        cb(null, 'zimg-producto' + Date.now() + path.extname(file.originalname));
        console.log(file);
    },
});
let upload = multer({ storage });

var router = express.Router();
const { admin, add, store, edit, update, hastaLaVistaBeibi, search } = require('../controllers/adminController');

router.get('/', admin);

router.get('/add', add);
router.post('/add', upload.single('imageAdmin'), store);

router.get('/edit/:id', edit);
router.put('/update/:id', update);

router.get('/delete/:id', hastaLaVistaBeibi);
router.get('/search_results/', search);




module.exports = router;





