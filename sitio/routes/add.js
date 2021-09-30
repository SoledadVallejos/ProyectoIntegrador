var express = require('express');
var router = express.Router();

const { add } = require('../controllers/addController');

router.get('/', add);
router.post('/add', add)





module.exports = router;