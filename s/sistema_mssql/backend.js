const sql       = require('mssql');

const sqlConfig = {
    user: 'sa',
    password: 'Neury123',
    database: 'dba_mssql',
    server: 'localhost',
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
};

const LIMITE    = 5;
const objeto    = {};

/* clase
--------------------------------------------------------------------------------*/
class Sistema {
    static
    insertar(req, res) {
        try {
            sql.connect(sqlConfig).then(function() {

                new sql.Request()
                .query(`INSERT INTO dbo.SistemaMSSQL VALUES('${req[0]}', '${req[1]}', ${req[2]}, CURRENT_TIMESTAMP)`)
                .then(function(resultado) {
                    if (resultado === null || resultado.length === 0) {
                        return;
                    } else {
                        Sistema.leer(res);
                    }
                }).catch(function (error) {
                    console.dir(error);
                });
            }).catch(function (error) {
                console.dir(error);
            });
        } catch (error) {
            console.dir(error);
        }
    }
    static
    leer(res) {
        try {
            sql.connect(sqlConfig).then(function() {
                new sql.Request().query(`SELECT TOP ${LIMITE} * FROM SistemaMSSQL ORDER BY id DESC`).then(function(resultado) {
                    if (resultado === null || resultado.length === 0) {
                        return;
                    } else {
                        res.setHeader('Content-type', 'text/json');
                        res.send(resultado);
                    }
                }).catch(function (error) {
                    console.dir(error);
                });
            }).catch(function (error) {
                console.dir(error);
            });
        } catch (error) {
            console.dir(error);
        }
    }
    static
    buscar(req, res) {
        console.log(typeof req, req);
        try {
            sql.connect(sqlConfig).then(function() {
                new sql.Request().query(`SELECT TOP ${LIMITE} * FROM SistemaMSSQL WHERE nombre LIKE '%${req}%' OR marca LIKE '%${req}%' ORDER BY id DESC`).then(function(resultado) {
                    if (resultado === null || resultado.length === 0) {
                        return;
                    } else {
                        res.setHeader('Content-type', 'text/json');
                        res.send(resultado);
                    }
                }).catch(function (error) {
                    console.dir(error);
                });
            }).catch(function (error) {
                console.dir(error);
            });
        } catch (error) {
            console.dir(error);
        }
    }
    static
    editar(req, res) {
        try {
            sql.connect(sqlConfig).then(function() {
                new sql.Request().query(`SELECT * FROM SistemaMSSQL WHERE id = ${req}`).then(function(resultado) {
                    if (resultado === null || resultado.length === 0) {
                        return;
                    } else {
                        res.setHeader('Content-type', 'text/json');
                        res.send(resultado);
                    }
                }).catch(function (error) {
                    console.dir(error);
                });
            }).catch(function (error) {
                console.dir(error);
            });
        } catch (error) {
            console.dir(error);
        }
    }
    static
    actualizar(req, id, res) {
        try {
            sql.connect(sqlConfig).then(function() {
                new sql.Request().query(`UPDATE SistemaMSSQL SET nombre = '${req[0]}', marca = '${req[1]}', precio = ${req[2]} WHERE id = ${id}`).then(function(resultado) {
                    if (resultado === null || resultado.length === 0) {
                        return;
                    } else {
                        Sistema.leer(res);
                    }
                }).catch(function (error) {
                    console.dir(error);
                });
            }).catch(function (error) {
                console.dir(error);
            });
        } catch (error) {
            console.dir(error);
        }
    }
    static
    orden(req, res) {
        try {
            sql.connect(sqlConfig).then(function() {
                new sql.Request().query(`SELECT TOP ${LIMITE} * FROM SistemaMSSQL ORDER BY ${req}`).then(function(resultado) {
                    if (resultado === null || resultado.length === 0) {
                        return;
                    } else {
                        res.setHeader('Content-type', 'text/json');
                        res.send(resultado);
                    }
                }).catch(function (error) {
                    console.dir(error);
                });
            }).catch(function (error) {
                console.dir(error);
            });
        } catch (error) {
            console.dir(error);
        }
    }
    static
    eliminar(req, res) {
        try {
            sql.connect(sqlConfig).then(function() {
                new sql.Request().query(`DELETE FROM SistemaMSSQL WHERE id = ${req}`).then(function(resultado) {
                    if (resultado === null || resultado.length === 0) {
                        return;
                    } else {
                        Sistema.leer(res);
                    }
                }).catch(function (error) {
                    console.dir(error);
                });
            }).catch(function (error) {
                console.dir(error);
            });
        } catch (error) {
            console.dir(error);
        }
    }
    static
    limite(req, res) { 
        try {
            sql.connect(sqlConfig).then(function() {
                new sql.Request().query(`SELECT COUNT(${req}) AS limite FROM SistemaMSSQL`).then(function(resultado) {
                    if (resultado === null || resultado.length === 0) {
                        return;
                    } else {
                        res.setHeader('Content-type', 'text/json');
                        res.send(resultado);
                    }
                }).catch(function (error) {
                    console.dir(error);
                });
            }).catch(function (error) {
                console.dir(error);
            });
        } catch (error) {
            console.dir(error);
        }
    }
    static 
    paginacion(req, res) { 
        try {
            sql.connect(sqlConfig).then(function() {
                new sql.Request().query(`SELECT * FROM SistemaMSSQL ORDER BY id DESC OFFSET ${req} ROWS FETCH NEXT ${LIMITE} ROWS ONLY`).then(function(resultado) {
                    if (resultado === null || resultado.length === 0) {
                        return;
                    } else {
                        res.setHeader('Content-type', 'text/json');
                        res.send(resultado);
                    }
                }).catch(function (error) {
                    console.dir(error);
                });
            }).catch(function (error) {
                console.dir(error);
            });
        } catch (error) {
            console.dir(error);
        }
    }
}

/* funciones
--------------------------------------------------------------------------------*/
objeto.insertar = function(req, res) {
    const { id, nombre, marca, precio, submit } = req.body;

    if (!id || !nombre || !marca || !precio || !submit) {
        res.status(400).send('Los campos no pueden estar vacios.');
        return;
    } 

    let valores = [nombre, marca, precio];

    if(submit === 'Insertar') {
        Sistema.insertar(valores, res);
    } else if(submit === 'Actualizar') {
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
        case "marca":
            Sistema.orden('marca DESC', res);
            break;
        case "precio":
            Sistema.orden('precio DESC', res);
            break;
        case "get":
            Sistema.orden('id DESC', res);
            break;
        default:
            Sistema.orden('id DESC', res);
            break;
    }
};

objeto.buscar = function(req, res) {
    Sistema.buscar(req.body.buscar, res);
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