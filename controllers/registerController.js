const fs = require('fs');
const path = require('path');

module.exports = {
    register: (req, res) => {
        return res.render('register', {
            title: 'Registro',

        });
    },
}


