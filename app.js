var createError     = require('http-errors');
var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
//var cors            = require('cors');

var inicio      = require('./routes/index');
var sistemaJSON = require('./routes/sistema_JSON');
var sistemaTXT  = require('./routes/sistema_TXT');
var sistemaCSV  = require('./routes/sistema_CSV');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

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
