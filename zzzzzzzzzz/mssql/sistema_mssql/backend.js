//const conectar = require('../conexion_mssql');
const sql       = require('mssql');
const sqlConfig = {
    user: 'sa',
    password: 'Neury123',
    database: 'dba_mssql',
    server: 'localhost',
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
};

const sqlConfig2 = 'Server=localhost,1433;Database=dba_mssql;User Id=sa;Password=Neury123;Encrypt=true';

const objeto   = {};

/* clase
--------------------------------------------------------------------------------*/
class Sistema {
    static
    insertar(req, res) {
        conectar.query('INSERT INTO Informacion VALUES (NULL, ?, NOW())', [req], function (error) {
            if (error) {
                throw error;
            } else {
                Sistema.leer(res);
            }
        });
    }
    static
    leer(res) {
//        conectar.query('SELECT * FROM Informacion ORDER BY id DESC LIMIT 5', function (error, resultado) {
//            if (error) {
//                throw error;
//            } else {
//                res.setHeader('Content-type', 'text/json');
//                res.send(resultado);
//            }
//        });
    }
    static
    editar(req, res) {
        conectar.query('SELECT * FROM Informacion WHERE id = ?', [req], function (error, resultado) {
            if (error) {
                throw error;
            } else {
                res.setHeader('Content-type', 'text/json');
                res.send(resultado);
            }
        });
    }
    static
    actualizar(req, id, res) {
        conectar.query('UPDATE Informacion SET ? WHERE id = ?', [req, id], function (error) {
            if (error) {
                throw error;
            } else {
                Sistema.leer(res);
            }
        });
    }
    static
    orden(req, res) {
//        async () => {
            try {
                // make sure that any items are correctly URL encoded in the connection string
                sql.connect(sqlConfig2);
                const result = sql.query`SELECT * FROM SistemaMSSQL`;
                console.log(result);
//                console.dir(result);
                
                res.setHeader('Content-type', 'text/json');
                res.send(result);
            } catch (err) {
                // ... error checks
            }
//        };
//        conectar.query(`SELECT * FROM Informacion ORDER BY ${req} LIMIT 5`, function (error, resultado) {
//            if (error) {
//                throw error;
//            } else {
//                res.setHeader('Content-type', 'text/json');
//                res.send(resultado);
//            }
//        });
    }
    static
    eliminar(req, res) {
        conectar.query('DELETE FROM Informacion WHERE id = ?', [req], function (error, resultado) {
            if (error) {
                throw error;
            } else {
                Sistema.leer(res);
            }
        });
    }
    static
    limite(req, res) { console.log(sql);
//        async () => {
            try {
                // make sure that any items are correctly URL encoded in the connection string
                sql.connect(sqlConfig2);
                const result = sql.query`SELECT COUNT(${req}) AS limite FROM SistemaMSSQL`;
                console.log(result);
//                console.dir(result);
                
                res.setHeader('Content-type', 'text/json');
                res.send(result);
            } catch (err) {
                // ... error checks
            }
//        };
        
//        conectar.query('SELECT COUNT(?) AS limite FROM Informacion', [req], function (error, resultado) {
//            if (error) {
//                throw error;
//            } else {
//                res.setHeader('Content-type', 'text/json');
//                res.send(resultado);
//            }
//        });
    }
    static 
    paginacion(req, res) { 
        conectar.query('SELECT * FROM Informacion ORDER BY id DESC LIMIT 5 OFFSET ?', [req], function (error, resultado) {
            if (error) {
                throw error;
            } else {
                res.setHeader('Content-type', 'text/json');
                res.send(resultado);
            }
        });
    }
}

/* funciones
--------------------------------------------------------------------------------*/
objeto.insertar = function(req, res) {
    const { id, nombre, clasificacion, tematica, nivel, enlace, submit } = req.body;

    if (!id || !nombre || !clasificacion || !tematica || !nivel || !enlace || !submit) {
        res.status(400).send('Los campos no pueden estar vacios.');
        return;
    } 

    if(submit === 'Insertar') {
        let valores = [nombre, clasificacion, tematica, nivel, enlace];
        
        Sistema.insertar(valores, res);
    } else if(submit === 'Actualizar') {
        let valores = {
            nombre: nombre, 
            clasificaciones: clasificacion, 
            tematicas: tematica, 
            nivel: nivel, 
            enlace: enlace
        };
        
        Sistema.actualizar(valores, id, res);
    }
};

objeto.obtener = function(req, res) {
    switch (req.params.id) {
        case "ASC":
            Sistema.orden('id ASC', res);
            break;
        case "DESC":
            Sistema.orden('id DESC', res);
            break;
        case "nombre":
            Sistema.orden('nombre DESC', res);
            break;
        case "nivel":
            Sistema.orden('nivel DESC', res);
            break;
        case "fecha":
            Sistema.orden('fecha DESC', res);
            break;
        case "get":
            Sistema.orden('id DESC', res);
            break;
        default:
//            Sistema.editar(req.params.id, res);
    }
};

objeto.editar = function(req, res) {
    Sistema.editar(req.params.id, res); 
};
        
objeto.eliminar = function(req, res) {
    Sistema.eliminar(req.params.id, res);
};

objeto.limite = function(req, res) {
    Sistema.limite(req.params.id, res);
};

objeto.paginacion = function(req, res) {
    Sistema.paginacion(Number(req.body.pagina), res);
};

module.exports = objeto;