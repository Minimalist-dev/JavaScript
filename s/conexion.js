const mysql = require('mysql');

const objeto = {};

const con = mysql.createConnection({
    host:       'localhost',
    user:       'root',
    password:   '',
    database:   'all_in_one'
});

objeto.consulta = (req, res) => {
    con.connect(function (error) {
        if (error) {
            throw error;
            console.log("Conexion fallida");
        } else {
            console.log("Conectado!");
            //Sort by name, in descending order:
            var sql = "SELECT * FROM Publicaciones ORDER BY id DESC";
            
            con.query(sql, function (error, resultado) {
                if (error) {
                    throw error;
                } else {
                    res.render('identidad', { 
                        title: 'Identidad del dispositivo | Neury', 
                        Objeto: resultado
                    });
//                    console.log(resultado);
                }
            });
        }
    });
//    console.log(res);
};

module.exports = objeto;