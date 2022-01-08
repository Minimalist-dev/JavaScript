var createError     = require('http-errors');
var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
//let session         = require('express-session');
var logger          = require('morgan');
//var cors            = require('cors');

var inicio      = require('./routes/index');
var sistemaJSON = require('./routes/sistema_JSON');
var sistemaTXT  = require('./routes/sistema_TXT');
var sistemaCSV  = require('./routes/sistema_CSV');
var logup       = require('./routes/logup');
var logCookie   = require('./routes/log_cookie');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//app.use(session({
//    secret: 'keyboard cat',
//    resave: true,
//    saveUninitialized: true,
//    cookie: { 
//        expires: new Date(Date.now() + 3600000),
//        maxAge: 3600000
//    }
//}));

var opciones = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    lastModified: true,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
    }
};
app.use(express.static(path.join(__dirname, 'public'), opciones));

app.use('/', inicio);
app.use('/sistema_JSON', sistemaJSON);
app.use('/sistema_TXT', sistemaTXT);
app.use('/sistema_CSV', sistemaCSV);
app.use('/logup', logup);
app.use('/log_cookie', logCookie);

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
    res.render('error');
});

module.exports = app;
