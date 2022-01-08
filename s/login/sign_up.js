let conectar    = require('../conectar_usuario');
let sesionBack  = require('./sesion_back');
let objeto      = {};

/* clase
--------------------------------------------------------------------------------*/
class Log {
    static
    signIn(req, res) { 
        conectar.query(`SELECT * FROM Login WHERE id = ${req.id}`, function (error, resultado) {
            if (error) { throw error; } 
            else {
                if(resultado.length === 1) {
                    res.setHeader('Content-type', 'text/json');
                    res.send({ 
                        id: resultado[0].id, 
                        correo: resultado[0].correo, 
                        fecha: resultado[0].fecha 
                    });
                } else {
                    res.redirect('/login');
                }
            }
        });
    }
}

/* funciones
--------------------------------------------------------------------------------*/
objeto.singIn = function(req, res) {
    Log.signIn(req.body, res);
};

objeto.singUp = function(req, res) {
    sesionBack.email = null; 
    
    res.setHeader('Content-type', 'text/json');
    res.send({ 
        res: sesionBack.email
    });
};

module.exports = objeto;