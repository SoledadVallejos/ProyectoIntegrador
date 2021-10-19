const path = require('path');
const { body, check } = require('express-validator');

module.exports = [
	body('name').notEmpty().withMessage('Debes escribir tu nombre'),
	body('lastName').notEmpty().withMessage('Debes escribir tu apellido'),
	body('email')
		.notEmpty().withMessage('Debes escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un Email con formato válido'),
	check('password') //check OTRA FORMA DE VALIDAR...
		.notEmpty().withMessage('Debes escribir una contraseña.').bail() // bail() TIRA ERROR Y CORTA. NECESARIO PARA EVITAR ERROR: "value invalid"
		.isLength({ min: 5 }).withMessage('Debe tener al menos 7 caracteres tu contraseña.'),
	body('country').notEmpty().withMessage('Debes elegir un país'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Debes subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
		return true;
	})
]
/*
// Validaciones. //ESTO PODRIA ESTAR EN OTRO ARCHIVO EN OTRA CARPETA DISPONIBLE A REQUERIR
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
// Validaciones. //ESTO PODRIA ESTAR EN OTRO ARCHIVO EN OTRA CARPETA DISPONIBLE A REQUERIR/
 */