const express   = require('express');
const router    = express.Router();
const servidor  = require("../s/identidad/identidad");
const chat      = require('../s/chat/l/backend');

const {v4: uuidv4} = require("uuid");

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

module.exports = router;
