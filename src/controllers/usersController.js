const db = require('../database/models');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator')









module.exports = {

    // REGISTER
    create: (req, res) => {
        res.render('users/register');
        return res.send(user); // COMPROBAR USUARIOS
    },
    processCreate: async (req, res) => {
        const { name, lastName, country, email, rol, password } = req.body;

        try {

            let userExist = await db.User.findOne({
                where: {
                    email
                }
            })
            if (userExist) {
                res.render('users/register', {
                    error: {
                        email: "este email ya esta registrado"
                    }
                }
                )
            }

            let user = await db.User.create(
                {
                    name: name.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    password: bcrypt.hashSync(password, 10),
                    country: country.trim(),
                    avatar: req.file ? req.file.filename : 'default.png',
                    rolId: rol ? rol : 1
                })

            req.session.userLogin = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                rol: user.rolId
            }
            console.log(req.session.userLogin)

            return res.redirect('/users/profile')
        } catch (error) {
            console.log(error)
        }
    },

    login: (req, res) => {
        return res.render('users/login', {
            title: 'Ingresar',

        });
    },
    processLogin: async (req, res) => {
        const { email, password, remember } = req.body;
        try {
            let user = await db.User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                return res.render('users/login', {
                    error: {
                        credenciales: "credenciales invalidas"
                    }
                }
                )
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return res.render('users/login', {
                    error: {
                        credenciales: "credenciales invalidas"
                    }
                }
                )
            }
            req.session.userLogin = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                rol: user.rolId
            }
            if (remember) {
                res.cookie('rememberRoma', req.session.userLogin, { maxAge: 1000000 * 60 })
            }
            console.log(req.session.userLogin)
            return res.redirect('/users/profile')
        }
        catch (error) {

        }
    }


    ,
    index: (req, res) => {
        let users = User.findAll();
        // return res.send(users); // COMPROBAR LISTA DE USUARIOS
        res.render('users/index', { users });
    },

    profile: async (req, res) => {
        let user = await db.User.findByPk(req.session.userLogin.id)
        return res.render('users/profile', { user });
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





