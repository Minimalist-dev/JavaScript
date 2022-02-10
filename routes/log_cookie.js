let express     = require('express');
let router      = express.Router();
let session     = require('express-session');
//let bcryptjs    = require('bcryptjs');
let signIn      = require('../s/login/sign_in_cookie');
let signUp      = require('../s/login/sign_up_cookie');
//let sesionBack  = require('../s/login/sesion_back');

router.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        expires: new Date(Date.now() + 3600000),
        maxAge: 3600000
    }
}));

/* GET pages. 
--------------------------------------------------------------------------------*/
router.get('/', function (req, res, next) {
/* cookie: guardar en db > req.cookies['connect.sid'] 
 * Utilizar la autentificación de cookie y session entre los archivos del 'routes'
--------------------------------------------------------------------------------*/
//    console.log(req.cookies);
//    res.cookie("nombre" , 'cookie_value');
//    res.cookie(name , 'value', {expire : new Date() + 9999});
//    console.log("Cookies 2:  ", req.cookies.nombre);
//    console.log('connect.sid: ' + req.cookies['connect.sid']);
//    console.log(req.session);
//    console.log(req.sessionStore);
//    console.log("router: logup: id" + req.session.id);
//    console.log("router: logup: ID" + req.sessionID);
    req.session.name = 'Yes';
    res.cookie('correo', '');//res.clearCookie('correo');
//    console.log(req.cookies);
    res.render('log_cookie', { title: 'Log Cookie | Doc. JS | Neury' });
});

/* Log cookie
--------------------------------------------------------------------------------*/
router.post('/in', signIn.singIn);
router.post('/up', signIn.singUp);
router.post('/signin', signUp.singIn);
router.post('/signup', signUp.singUp);

/* sesion cookie
--------------------------------------------------------------------------------*/
//router.get('/sesion_cookie', function (req, res, next) {
//    sesionBack.email !== null ? res.render('sesion_cookie') : res.redirect('back');
//});

/* Otras configuraciones
--------------------------------------------------------------------------------*/
////set

module.exports = router;
