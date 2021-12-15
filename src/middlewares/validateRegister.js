const {body,check} = require('express-validator');
const db = require('../database/models');
const path = require("path")

module.exports = [

    check('name')
        .notEmpty().withMessage('El nombre es requerido').bail()
        .isLength({
            min : 2
        }).withMessage('minimo 2 caracteres.'),
	check('lastName')
        .notEmpty().withMessage('El apellido es requerido').bail()
        .isLength({
            min : 2
        }).withMessage('minimo 2 caracteres.'),

    check('email')
        .notEmpty().withMessage('Debes ingresar tu email').bail()
        .isEmail().withMessage('Email inválido'),

    body('email')
        .custom(value  => {
          return db.User.findOne({
              where : { 
                  email : value
                }
          }).then( user => {
              if(user){
                  return Promise.reject('El email ya se encuentra registrado')
              }
          })
        }),

    check('password')
        .isLength({
            min : 8,
            max : 16
        }).withMessage('Contraseña minima de 8 caracteres y un máximo de 16'),
    
    body('password2')
        .custom((value,{req}) => {
            if(value !== req.body.password){
                return false
            }else{
                return true
            }
        }).withMessage('Las contraseñas no coinciden'),
    body('avatar') 
        .custom((value, { req }) => {
         let file = req.file;
           if (!file) {
               throw new Error('Al menos una imágen es necesaria')}
            else{return true}}),

    check('terms')
        .isString('on').withMessage('Debes aceptar los términos y condiciones')
    
]