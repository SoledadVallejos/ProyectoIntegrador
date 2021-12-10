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
	body('terms').notEmpty().withMessage('Debes aceptar los términos'),
	// body('rol').notEmpty().withMessage('Debes introducir Rol del usuario'),
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
