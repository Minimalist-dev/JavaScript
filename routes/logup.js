let express     = require('express');
let router      = express.Router();
//let session     = require('express-session');
//let bcryptjs    = require('bcryptjs');
let logIn       = require('../s/login/login');
let signIn      = require('../s/login/sign_in');
let logUp       = require('../s/login/logup');
let signUp      = require('../s/login/sign_up');
//let sesionBack  = require('../s/login/sesion_back');


/* GET pages. 
--------------------------------------------------------------------------------*/
router.get('/', function (req, res, next) {
/* cookie: guardar en db > req.cookies['connect.sid'] 
--------------------------------------------------------------------------------*/
//    console.log("router: logup: ");
//    console.log(req.cookies);
//    res.cookie("nombre" , 'cookie_value');
    //    res.cookie(name , 'value', {expire : new Date() + 9999});
    
//    console.log("Cookies 1:  ", req.cookies);
//    console.log("Cookies 2:  ", req.cookies.nombre);
//    console.log('connect.sid: ' + req.cookies['connect.sid']);

//    console.log(req.session);
//    console.log(req.sessionStore);
//    console.log("router: logup: id" + req.session.id);
//    console.log("router: logup: ID" + req.sessionID);
    
    

    
    res.render('logup', { title: 'Log up | Doc. JS | Neury' });
});

/* Log up
--------------------------------------------------------------------------------*/
//router.get('/sesion', function (req, res, next) {
//    sesionBack.email !== null ? res.render('sesion') : res.redirect('back');
//});
router.post('/inback', logUp.singIn);
router.post('/upback', logUp.singUp);
router.post('/signin', signUp.singIn);
router.post('/signup', signUp.singUp);

/* Log in
--------------------------------------------------------------------------------*/
router.post('/in', logIn.singIn);
router.post('/up', logIn.singUp);
router.post('/sesion', signIn.singIn);

module.exports = router;
