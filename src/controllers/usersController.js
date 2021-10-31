// REQUIRES
const fs = require('fs');
const path = require('path');
//              ERRORES    EXTRAER  DE  express - validator
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
// DE REGISTRO LOGIN COMPLETO JAVI...
const User = require('../models/UserModel');
let users = require(path.join(__dirname, '../data/users.json'));
// DE DH COMPLETE VALIDACIONES CODELANDO...
const jsonTable = require('../models/jsonTable');
const usersModel = jsonTable('users');

module.exports = {

    // REGISTER
    create: (req, res) => {
        res.render('users/register');
        return res.send(user); // COMPROBAR USUARIOS
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
                    avatar: req.file.filename,
                    // SI checkbox   NO VACIO    Admin    SINO  Usuario
                    rol: req.body.rol != null ? 'Administrador' : 'Usuario',
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
            if (user) {
                let isOkThePassword = bcryptjs.compareSync(req.body.password, user.password);
                if (isOkThePassword) {
                    req.session.userLogin = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        rol: user.rol
                    }
                    if (req.body.remember) {
                        res.cookie('rememberRoma', req.session.userLogin, { maxAge: 1000000 * 60 })
                    }
                }
            }

            return res.redirect('/')
        } else {
            return res.render('users/login', {
                errores: errors.mapped()
            })
        }
    },

    index: (req, res) => {
        let users = User.findAll();
        // return res.send(users); // COMPROBAR LISTA DE USUARIOS
        res.render('users/index', { users });
    },

    profile: (req, res) => {
        let user = usersModel.find(req.params.id);
        res.render('users/profile', { user });
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





