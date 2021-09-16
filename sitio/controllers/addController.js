const fs = require('fs');
const path = require('path');

module.exports = {
    add: (req, res) => {
        return res.render('products/Add', {
            title: 'add',

        });
    },
}
