let fs = require('fs');

const URL = 'public/s_db/l/sistema_txt/db.txt';

let ruta        = fs.readFileSync(URL, 'utf-8');
let objeto      = {};
let reescribir  = [];

class Global {
    static
    cambios(datos) {
        fs.appendFileSync(URL, datos.toString() + ' \n', function (err) {
            if (err)
                throw err;
            console.log('Saved!');
        });
    }
    static
    cambiar() {
        let lines = ruta.split(/\n/);
            
        lines.forEach(function(valor, indice, valores) {
            reescribir.push(valor);
        });
    }
}

objeto.insertar = function(req, res) {
    const { id, marca, nombre, precio, submit } = req.body;

    if (!marca || !nombre || !precio) {
        res.status(400).send("Entries must have a title and body");
        return;
    } 
    
    let date    = new Date();
    let fecha   = date.toLocaleDateString();
    let hora    = date.toLocaleTimeString();
    let datos   = [ marca, nombre, precio, fecha, hora ];
    
    if(submit === 'Crear') {
        Global.cambios(datos);
    } else if(submit === 'Actualizar') {
        reescribir = [];
        
        Global.cambiar();

        setTimeout(function() {
            reescribir.forEach(function(valor, indice) {
                if(indice === Number(id)) {
                    reescribir.splice(indice, 1, datos);
                }
            });
            
            fs.writeFileSync(URL, '', function (err) {
                if (err)
                    throw err;
                console.log('Saved!');
            });
            
            reescribir.forEach(function(valor, indice) { console.log(valor);
                Global.cambios(valor);
            });
        }, 500);
    }
    
    res.setHeader('Content-type', 'text/plain');
    res.send(ruta);
};
objeto.obtener = function(req, res) {
    let lines = ruta.split(/\n/);
            
    lines.forEach(function(valor, indice) {
        if(indice === Number(req.params.id)) {
            let separar = valor.split(",");
            
            let datos = JSON.stringify({
                id:         indice,
                marca:      separar[0],
                nombre:     separar[1],
                precio:     separar[2],
                fecha:      separar[3],
                hora:       separar[4]
            });
            res.setHeader('Content-type', 'text/json');
            res.send(datos);
        }
    }); 
};

objeto.eliminar = function(req, res) {
    reescribir = [];
    
    Global.cambiar();
    
    setTimeout(function() {
        reescribir.forEach(function(valor, indice) {
            if(indice === Number(req.params.id)) {
                reescribir.splice(indice, 1);
            }
        });

        fs.writeFileSync(URL, '', function (err) {
            if (err)
                throw err;
            console.log('Saved!');
        });

        reescribir.forEach(function(valor, indice) {
            Global.cambios(valor);
        });
    }, 500);
};

module.exports = objeto;

