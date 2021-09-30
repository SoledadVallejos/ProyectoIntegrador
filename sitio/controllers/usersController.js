const fs = require('fs');
const path = require('path');

module.exports = {
    register: (req, res) => {
        return res.render('users/register', {
            title: 'Registro',

        });
    },
    processRegister : (req,res) => {
        const {name,email,password} = req.body;
        let user = {
            id : users.length != 0 ? users[users.length - 1].id + 1 : 1,
            name : name.trim(),
            email : email.trim(),
            password : bcrypt.hashSync(password,10),
            category : 'admin.png',
            imagen : "user"
        }
    },
    login : (req, res) => {
        return res.render('login', {title: 'login',})
    }
    
}



