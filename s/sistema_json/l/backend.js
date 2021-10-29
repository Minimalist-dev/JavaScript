const fs        = require('fs');
const objeto    = {};
const ruta      = fs.readFileSync('public/s_db/l/sistema_json/db.json', 'utf-8');
const archivo   = JSON.parse(ruta);

class Global {
    static
    cambios() {
        let encadenar = JSON.stringify(archivo);
        fs.writeFileSync('public/s_db/l/sistema_json/db.json', encadenar, 'utf-8');
    }
}

objeto.insertar = function(req, res) {
    const { id, marca, nombre, precio, submit } = req.body;
//    const datos = req.body;
    if (!id || !marca || !nombre || !precio) {
        res.status(400).send("Entries must have a title and body");
        return;
    } 
    
    let fecha       = new Date();
    let eliminado   = false;
    let datos       = { id, fecha, marca, nombre, precio, eliminado };
    
    if(submit === "Crear") {
        archivo.push(datos);
    } else if(submit === "Actualizar") {
        archivo.forEach(function(valor, indice, valores) {
            if(valores[indice].id === id) {
                valores[indice].marca   = marca;
                valores[indice].nombre  = nombre;
                valores[indice].precio  = precio;
            }
        });
    }

    Global.cambios();

    res.setHeader('Content-type', 'text/json');
    res.send(archivo);
};
objeto.obtener = function(req, res) { 
    let id = req.params.id;
    
    archivo.forEach(function(valor, indice, valores) {
        if(valores[indice].id === id) {
            let datos = JSON.stringify({
                id:         valores[indice].id,
                fecha:      valores[indice].fecha,
                marca:      valores[indice].marca,
                nombre:     valores[indice].nombre,
                precio:     valores[indice].precio,
                eliminado:  valores[indice].eliminado
            });

            res.setHeader('Content-type', 'text/json');
            res.send(datos);
        }
    });  
};
objeto.actualizar = function(req, res) {
    archivo.forEach(function(valor, indice, valores) {
        if(valores[indice].id === req.params.id) {
            archivo.splice(indice, 1);
        }
    });
    
    Global.cambios();

    res.setHeader('Content-type', 'text/json');
    res.send(archivo);
};
objeto.eliminar = function(req, res) {
    archivo.forEach(function(valor, indice, valores) {
        if(valores[indice].id === req.params.id) {
            valores[indice].fecha       = null;
            valores[indice].marca       = null;
            valores[indice].nombre      = null;
            valores[indice].precio      = null;
            valores[indice].eliminado   = true;
            //archivo.splice(indice, 1);delete valores[indice];
        }
    });
    
    Global.cambios();

    res.setHeader('Content-type', 'text/json');
    res.send(archivo);
};

module.exports = objeto;