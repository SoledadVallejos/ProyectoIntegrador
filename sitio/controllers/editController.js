const fs = require('fs');
const path = require('path');

module.exports = {
    edit: (req, res) => {
        return res.render('products/Edit', {
            title: 'edit',

        });
    },
}
