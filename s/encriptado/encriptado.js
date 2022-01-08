let CryptoJS    = require("crypto-js");
let objeto      = {};

objeto.insertar = function(req, res) {
    const { info } = req.body;

/* Decrypt en el servidor
--------------------------------------------------------------------------------*/
var bytes  = CryptoJS.AES.decrypt(info, 'contrasena');
var originalText = bytes.toString(CryptoJS.enc.Utf8);
console.log(originalText);

/* 100% en el servidor
--------------------------------------------------------------------------------*/
//// Encrypt
//var ciphertext = CryptoJS.AES.encrypt(info, 'contrasena').toString();
//console.log(ciphertext);
//// Decrypt
//var bytes  = CryptoJS.AES.decrypt(ciphertext, 'contrasena');
//var originalText = bytes.toString(CryptoJS.enc.Utf8);
//console.log(originalText);
                                                                   /* finalizado
--------------------------------------------------------------------------------*/ 

    res.setHeader('Content-type', 'text/plain');
    res.send(originalText);
};

module.exports = objeto;