// REQUIRES
var express = require('express');
const { create, processCreate, login, processLogin, logout } = require('../controllers/usersController');

// express.Router() EN router
var router = express.Router();

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const loginValidator = require('../validations/loginValidator');

// ROUTES

// REGISTER
//     '/users/register' =app.js+users.js
router.get('/register', guestMiddleware, create);
// REGISTER PROCESS
router.post('/register', uploadFile.single('avatar'), validations, processCreate);

// LOGIN
router.get('/login', guestMiddleware, login);
router.post('/login', loginValidator, processLogin);

router.get('/logout/', logout);




module.exports = router;









/* const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

// VALIDACIONES. //ESTO PODRIA ESTAR EN OTRO ARCHIVO EN OTRA CARPETA DISPONIBLE A REQUERIR
const { body, check } = require('express-validator');
const validateCreateForm = [
    body('first_name').notEmpty().withMessage('Debes completar el campo de nombre'),
    body('last_name').notEmpty().withMessage('Debes completar el campo de apellido'),
    body('email').isEmail().withMessage('Debes completar un email válido'),
    check('password') //check OTRA FORMA DE VALIDAR...
        .notEmpty().withMessage('Debes elegir una contraseña.').bail() // bail() TIRA ERROR Y CORTA. NECESARIO PARA EVITAR ERROR: "value invalid"
        .isLength({ min: 5 }).withMessage('Debe tener mínimo 5 caracteres la contraseña.'),
    check('category').notEmpty().withMessage('Debes elegir una categoría.')
];
// VALIDACIONES. //ESTO PODRIA ESTAR EN OTRO ARCHIVO EN OTRA CARPETA DISPONIBLE A REQUERIR/

// TODOS LOS USUARIOS
router.get('/', controller.index);

// REGISTER
router.get('/create', controller.create);
// REGISTER PROCESS
// PONER        validateCreateForm  VALIDADOR DE form, CONFIGURADO ANTES, ENTRE LA RUTA Y EL MÉTODO
router.post('/', validateCreateForm, controller.store);

// DETALLE DE USUARIO
router.get('/:id', controller.show);

module.exports = router; */