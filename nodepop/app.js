var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const i18n = require('./lib/i18nConfigure');
const LoginController = require('./controllers/loginController');

require('./lib/connectMongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * RUTAS DEL API
*/
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv2/anuncios', require('./routes/apiv2/anuncios'));

app.use(i18n.init);

const loginController = new LoginController();

/**
 * RUTAS DEL WEBSITE
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', require('./routes/about'));
app.use('/change-locale', require('./routes/change-locale'));
app.get('/login', loginController.index);
app.post('/login', loginController.post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // Se comprueba si el error es un error de validación
  if (err.array) {
    const errorInfo = err.errors[0];
    err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }

  res.status(err.status || 500);

  // Si lo que ha fallado es una petición al API Version 1
  // Se devuelve el error en formato JSON
  if (req.originalUrl.startsWith('/apiv1/')) {
    res.json({error: err.message});
    return;
  }

  // Si lo que ha fallado es una petición al API Version 2
  // Se devuelve el error en formato JSON también
  if (req.originalUrl.startsWith('/apiv2/')) {
    res.json({error: err.message});
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
