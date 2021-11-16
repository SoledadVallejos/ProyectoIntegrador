const multer = require('multer')
const path = require('path')

n = new Date();
//Año
y = n.getFullYear();
//Mes
m = n.getMonth() + 1;
//Día
d = n.getDate();
//Sec
s = n.getMilliseconds();
//Lo ordenas a gusto.
let fecha = y + "-" + m + "-" + d + "-" + s;
console.log(fecha);

//SplideImages
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/productDetail-splide'));
    },
    filename: (req, file, cb) => {
        console.log(file); // COMPROBAR EN TERMINAL (DONDE CORRE EL PUERTO) LA DATA DE LA IMÁGEN
        let newsFilesName = file.fieldname + '-' + fecha + '-' + Date.now() + '-' + path.extname(file.originalname);
        cb(null, newsFilesName);
    },
});
let uploadMultiple = multer({ storage });

module.exports = uploadMultiple;
//SplideImages/