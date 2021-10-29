const fs = require('fs');
//var path = require('path');

const sistamaJSON = fs.readFileSync('sistema_JSON.json', 'utf-8');
//const sistamaJSON = fs.readFileSync('s_json/db.json', 'utf-8');
//const sistamaJSON = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
const archivo = JSON.parse(sistamaJSON);

class Insertar {
    constructor() {
        
    }
    static
    datos(req, res)  {

        const { id, fecha, marca, nombre, precio } = req.body;

        if (!id || !fecha || !marca || !nombre || !precio) {
            res.status(400).send("Entries must have a title and body");
            return;
        }

        let datos = {
            id,
            fecha,
            marca,
            nombre,
            precio
        };

        archivo.push(datos);

        // saving the array in a file
        const sistamaJSON = JSON.stringify(archivo);
        fs.writeFileSync('sistema_JSON.json', sistamaJSON, 'utf-8');
//        fs.writeFileSync('s_json/db.json', sistamaJSON, 'utf-8');
//        fs.writeFileSync(path.join(__dirname, 'db.json'), sistamaJSON, 'utf-8');
//        res.render('sistema_JSON', { title: 'Nuevo sistema JSON', Datos: datos });
        res.redirect('/sistema_JSON');
    };
}

module.exports = Insertar; 

