// NECESARIOCART
// NECESARIOEDIT
// NECESARIOADD

//NOMODIFICADO
var express = require('express');
var router = express.Router();
const upload = require('../middlewares/multerImageProduct')

// EEDITT RUTAS CORRECTAS
const { getEmails, deleteImage, addImage } = require('../controllers/apiController');
const { show, add, remove, empty } = require('../controllers/cartApiController');


/* /api */
router
    .get('/get-emails', getEmails)
    .post('/delete-image/:id', deleteImage)
    .post('/add-images/:id', upload.any(), addImage)
    .get('/carts/show', show)
    .get('/carts/add/:id', add)
    .get('/carts/remove/:id', remove)
    .get('/carts/empty', empty)

module.exports = router;
