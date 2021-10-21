// REQUIRES
const fs = require('fs');
const path = require('path');
//              ERRORES    EXTRAER  DE  express - validator
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const User = require('../models/UserModel');
let users = require(path.join(__dirname, '../data/users.json'));


module.exports = {

    // REGISTER
    create: (req, res) => {
        //vista register.ejs= '/users/register'
        res.render('users/register');
    },
    processCreate: (req, res) => {
        // PONER ERRORES EN UNA VARIABLE SI LOS HAY
        let errors = validationResult(req);
        console.log(errors); // COMPROBAR
        //CONDICIONAL NECESARIO PARA MOSTRAR ERRORES SOLO SI LOS HAY, O CUANDO LOS HAYA. SINO MOSTRARÍA ERROR
        // SI errors VACÍO... PROCEDER COMO SIGUE
        if (errors.isEmpty()) {
            //  USUARIO EXISTE? 
            let userInDB = User.findByField('email', req.body.email);
            // SI EXISTE... MOSTRAR MENSAJE DE ERROR EN form
            if (userInDB) {
                return res.render('users/register', {
                    errors: [
                        {
                            value: "",
                            msg: "Este Email ya está registrado",
                            param: "email",
                            location: "body"
                        }
                    ],
                    old: req.body,
                }
                );
            }
            console.log(errors); //  COMPROBAR
            if (req.body.password === req.body.password2) {
                req.body.password2 = null;
                // SIGUE EJECUTANDO...
                // USUARIO A CREAR... RECOLECTAR DATOS DEL USUARIO EN ESTA VARIABLE
                let userToCreate = {
                    // TRAE DATOS DE LOS inputs del form
                    ...req.body,
                    // PISA password NO ENCRIPTADO DEL req.body Y ES ENCRIPTADO POR bcryptsjs
                    password: bcryptjs.hashSync(req.body.password, 10),
                    // REQUIERE filename DE avatar (nombre de imágen)
                    avatar: req.file.filename
                }
                // USUARIO CREADO CON FUNCION DEFINIDA EN UserModel
                let userCreated = User.create(userToCreate);
                // NUEVO USUARIO CREADO REDIRIGIDO AL login
                return res.redirect('/users/login');
                //SINO, (si en errors hay errores) PROCEDER A EXPONERLOS AL USUARIO
            } else {
                return res.render('users/register', {
                    errors: [
                        {
                            value: "",
                            msg: "Las contraseñas no coinciden",
                            param: "password",
                            location: "body"
                        }
                    ],
                    old: req.body,
                }
                );
            }
        } else {
            // RENDER form  register    :
            res.render('users/register', {
                // DATOS DE ERRORES DISPONIBLES EN form register
                errors: errors.array(), // Errors COMO array DE ERRORES SI NO COMPLETA form DE CREACIÓN DE USUARIO
                old: req.body, // old: req.body RECORDAR VIEJO DATO INGRESADO
            });
        }
        console.log(errors); // COMPROBAR ARRAY DE ERRORES
    },

    login: (req, res) => {
        return res.render('users/login', {
            title: 'Ingresar',

        });
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let user = users.find(user => user.email === req.body.email);
            req.session.userLogin = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                rol: user.rol
            }
            if (req.body.remember) {
                res.cookie('rememberRoma', req.session.userLogged, { maxAge: 1000000 * 60 })
            }
            return res.redirect('/')
        } else {
            return res.render('users/login', {
                errores: errors.mapped()
            })
        }
    },

    logout: (req, res) => {
        res.clearCookie('connect.sid');
        res.clearCookie('rememberRoma');
        req.session.destroy();
        return res.redirect('/');
    }

}





/*
// REPASANDO ARRAYS XD!
{
    errorss = [
        {
            "value": "",
            "msg": "Debes completar el campo de nombre",
            "param": "first_name",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Debes completar el campo de apellido",
            "param": "last_name",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Debes completar un email válido",
            "param": "email",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Debes elegir una contraseña.",
            "param": "password",
            "location": "body"
        },
        {
            "value": "",
            "msg": "Debes elegir una categoría.",
            "param": "category",
            "location": "body"
        }
    ]
}
// ACCEDIENDO SIN ITERAR
//                   NOMBRE[INDICE]+NOMBRE INDICE
// console.log(errorss[0].msg);
// PRINT: Debes completar el campo de nombre

//ACCEDIENDO ITERANDO
//INDICE + NOMBRE INDICE
// index.msg
*/





