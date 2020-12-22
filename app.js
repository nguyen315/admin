require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

const passport = require('./authenticate/passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product.route');
const bodyParser = require('body-parser')

const { db } = require('./db/db')

var app = express();

// modify


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Passport middleware
app.use(session({ secret: process.env.SESSION_SCRET }));
app.use(passport.initialize());
app.use(passport.session());

// Pass req.user to layout
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;