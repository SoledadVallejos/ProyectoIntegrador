// REQUIRES
var express = require('express');
const { create, processCreate,nosotros, login, processLogin,detail, index, profile, logout } = require('../controllers/usersController');

// express.Router() EN router
var router = express.Router();

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validateRegister = require('../middlewares/validateRegister');
const adminMiddleware = require('../middlewares/adminMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const myProfileOnlyMiddleware = require('../middlewares/authMiddleware');
const loginValidator = require('../validations/loginValidator');

// ROUTES

// REGISTER
//     '/users/register' =app.js+users.js
router.get('/register', create);
// REGISTER PROCESS
router.post('/register', uploadFile.single('avatar'), validateRegister, processCreate);

// LOGIN
router.get('/login', guestMiddleware, login);
router.post('/login', loginValidator, processLogin);

// TODOS LOS USARIOS
router.get('/', adminMiddleware, index);

router.get('/nosotros', nosotros);

// PERFIL DE USUARIO
router.get('/profile',authMiddleware, profile);

// LOGOUT
router.get('/logout/', logout);

router.get('/detail/:id', detail);






module.exports = router;







