var createError     = require('http-errors');
var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');

var inicio          = require('./routes/index');
var sistemaJSON     = require('./routes/sistema_JSON');
var sistemaTXT      = require('./routes/sistema_TXT');
var sistemaCSV      = require('./routes/sistema_CSV');
var sistemaMSSQL    = require('./routes/sistema_mssql');
var logup           = require('./routes/logup');
var logCookie       = require('./routes/log_cookie');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
/* use: configuraciones
--------------------------------------------------------------------------------*/
app.use(function(req, res, next) { //console.log("req.url: ", req.url);
    if(
        req.url === "/i/cache_control"                             ||
        req.url.includes("/i_css/cache_control/cache_control.css") ||
        req.url.match("/l/cache_control/cache_control.js")
    ){
        const tiempoDeCache = 36000;/* el valor que desees para esta ruta */
        
        res.set({
            'Cache-Control': `max-age=${tiempoDeCache}`
        });
    } else {
        res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        });
    }
    
    next();
});

var opciones = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    lastModified: true,
    maxAge: '1d',
    redirect: false,
    setHeaders: function(res, path, stat) {
        res.set('x-timestamp', Date.now());
//        res.set({//configuracion de cache en los archivos estaticos
//            'x-timestamp' : Date.now(),
//            'Cache-Control': 'no-store',
//            'Cache-Control' : 'no-cache, no-store, must-revalidate'
//            'Cache-Control' : (path.includes('/i/cache_control')) ? 'no-store' : 'public, max-age: 3600'
//        });
    }
};
app.use(express.static(path.join(__dirname, 'public'), opciones));

app.use('/', inicio);
app.use('/sistema_JSON', sistemaJSON);
app.use('/sistema_TXT', sistemaTXT);
app.use('/sistema_CSV', sistemaCSV);
app.use('/sistema_mssql', sistemaMSSQL);
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
