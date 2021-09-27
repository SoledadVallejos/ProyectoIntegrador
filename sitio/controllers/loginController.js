const fs = require('fs');
const path = require('path');
const users = require(path.join(__dirname,'../data/users.json'));

module.exports = {
    login: (req, res) => {
        return res.render('users/login', {
            title: 'Ingresar',

        });
    },
    processLogin : (req,res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            let user = users.find(user => user.email === req.body.email);
            req.session.userLogin = {
                id : user.id,
                name : user.name,
                avatar : user.avatar,
                rol : user.rol
            }
        }
    }
}
users.push(user);
        fs.writeFileSync(path.join(__dirname,'../data/users.json'),JSON.stringify(users,null,3),'utf-8');
        return res.redirect('/')

