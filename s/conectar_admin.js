var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'javascript'
});

conexion.connect(function (error) {
    if (error) {
        throw error;
        return error;
    } else {
        return true;
    }
});

module.exports = conexion;