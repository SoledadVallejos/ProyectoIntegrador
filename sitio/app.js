// REQUIRES
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
// const session = require('express-session');
const session = require('express-session');
// const cookies = require('cookie-parser');

// REQUIRE ROUTES
var index = require('./routes/index');
var products = require('./routes/products');
var users = require('./routes/users');
var admin = require('./routes/admin');

// EXPRESS EN app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARES DE APLICACION
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.use(session({
  secret : "Roma",
  resave : false,
  saveUninitialized : true
}))

// INICIAN RUTAS
app.use('/', index);
app.use('/products', products);
app.use('/users', users);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('general/error');
});

module.exports = app;



