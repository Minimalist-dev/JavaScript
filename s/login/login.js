let conectar = require('../conectar_usuario');
let objeto   = {};

/* clase
--------------------------------------------------------------------------------*/
class Login {
    static
    signIn(req, res) {
        const SELECT = 'SELECT * FROM Login WHERE correo = ? AND codigo = ?';
        
        conectar.query(SELECT, [req.correo, req.codigo], function (error, resultado) {
            if (error) { throw error; } 
            else {
                if(resultado.length === 1) {
                    res.setHeader('Content-type', 'text/json');
                    res.send({ res: 'Acceso.', id: resultado[0].id });
                } else {
                    res.setHeader('Content-type', 'text/json');
                    res.send({ res: 'Los datos no coinciden.' });
                }
            }
        });
    }
    static
    signUp(req, res) { console.log("req: " + req.correo);
        conectar.query('SELECT correo FROM Login WHERE correo = ?', [req.correo], function (error, resultado) {
            if (error) {
                throw error;
            } else {
                if(resultado.length === 1) {
                    res.setHeader('Content-type', 'text/json');
                    res.send({ res: 'Esta cuenta ya existe.' });
                } else {
                    const INSERT = 'INSERT INTO Login VALUES (NULL, ?, ?, NOW())';
                    
                    conectar.query(INSERT, [req.correo, req.codigo], function (error, resultado) {
                        if (error) {
                            throw error;
                        } else {
                            res.setHeader('Content-type', 'text/json');
                            res.send({ res: 'Registrado con existo.' });
                        }
                    });
                }      
            }
        });
    }
    
}

/* funciones
--------------------------------------------------------------------------------*/
objeto.singIn = function(req, res) {
    Login.signIn(req.body, res);
};

objeto.singUp = function(req, res) {
    Login.signUp(req.body, res);  
};



module.exports = objeto;