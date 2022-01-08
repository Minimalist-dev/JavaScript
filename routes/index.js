let express       = require('express');
let session       = require('express-session');
let router        = express.Router();
let servidor      = require('../s/identidad/identidad');
let chat          = require('../s/chat/l/backend');
let generarPDF    = require('../s/pdf/backend');
let paperSizes    = require('../s/pdf/paper_sizes');
let email         = require('../s/email/email');
let encriptado    = require('../s/encriptado/encriptado');
let sesionBack    = require('../s/login/sesion_back');


router.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        expires: new Date(Date.now() + 3600000),
        maxAge: 3600000
    }
}));

let {v4: uuidv4} = require("uuid");

/* GET pages. 
--------------------------------------------------------------------------------*/
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Doc. JavaScript' });
});

/* Identidad
--------------------------------------------------------------------------------*/
router.get('/identidad', servidor.identidad);

/* Chat
--------------------------------------------------------------------------------*/
router.post('/i/chat', chat.insertar);

/* Video Chat
--------------------------------------------------------------------------------*/
router.get("/video_chat", (req, res) => {
    res.redirect(`/video_chat/${uuidv4()}`);
});
router.get("/video_chat/:sala", (req, res) => {
    res.render("video_chat", { sala: req.params.sala });
});

/* PDF
--------------------------------------------------------------------------------*/
router.get('/i/pdf/generar_pdf/:id', generarPDF.guardar);
router.post('/i/pdf/paper_sizes', paperSizes.guardar);
router.get('/i/pdf/paper_sizes/:id', paperSizes.guardar);

/* Email
--------------------------------------------------------------------------------*/
router.post('/i/email/email', email.enviar);

/* Encriptado
--------------------------------------------------------------------------------*/
router.post('/i/encriptado', encriptado.insertar);

/* Log up 
--------------------------------------------------------------------------------*/
router.get('/sesion', function (req, res, next) {
    sesionBack.email !== null ? res.render('sesion') : res.redirect('back');
});
//router.get('/sesion/:id', function (req, res, next) {
//    req.session.destroy(function() {
//        res.redirect('/');
//    });
//});

/* sesion cookie
--------------------------------------------------------------------------------*/
router.get('/sesion_cookie', function (req, res, next) {
    /* req.session.name = sesionBack.email;
    -----------------------------------------------------------------------------*/
    console.log("session: " + req.session.name);
    
    res.cookie('correo', sesionBack.email, { expire : new Date(Date.now() + 3600000)});

    sesionBack.email !== null ? res.render('sesion_cookie', { correo: sesionBack.email }) : res.redirect('back');
});
router.get('/sesion_cookie_1', function (req, res, next) {
    if(req.cookies.correo === '' || req.cookies.correo === 'j:null' ) { 
        res.redirect('back');
    } else {
        res.render('sesion_cookie_1', { correo: sesionBack.email });
    }
});

module.exports = router;
