let texto, salida, identificador;  

let insertar        = document.querySelector('#insertar');
let consulta        = document.querySelector('#consulta');
let res             = document.querySelector('#res');
let id              = document.querySelector('#id');
let marca           = document.querySelector('#marca');
let nombre          = document.querySelector('#nombre');
let precio          = document.querySelector('#precio');
let submit          = document.querySelector('#submit');

/* Sistema TXT
--------------------------------------------------------------------------------*/
class Sistema {
    static
    obtener() {
        fetch('../s_db/l/sistema_csv/db.csv', {
            method: 'GET'
        }).then(function(response) {
            if(response.ok) { return response.text(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(text) { 
            texto = text;

            Sistema.colocar();
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static 
    colocar() {
        salida = '';

        let linea = texto.split(/\n/);

        linea.forEach(function(valor, indice, valores) {
            let separar = valor.split(",");

            salida += `
                <tr>
                    <td>${indice}</td>
                    <td>${separar[0]}</td>
                    <td>${separar[1]}</td>
                    <td>${separar[2]}</td>
                    <td>${separar[3]}</td>
                    <td>${separar[4]}</td>
                    <td>
                        <button type='submit' onclick="Sistema.actualizar(${indice})">Editar</button>
                    </td> 
                    <td>
                        <button type='button' onclick="Sistema.eliminar(${indice})">Eliminar</button>
                    </td>  
                </tr>
            `; 
        });

        if(salida !== '') {
            consulta.innerHTML = salida;
        } else {
            consulta.innerHTML = `
                <tr>
                    <td colspan='8' style='text-align: center;padding: 16px 0px;'>
                        No ha resultados...
                    </td>
                </tr>
            `;
        }
    }
    static
    insertar() {
        let id = document.forms['insertar']['id'].value;
        
        id === '' ? identificador = '' : identificador = id;
        
        let datos = JSON.stringify({
            id:     identificador.toString(),
            marca:  document.forms['insertar']['marca'].value,
            nombre: document.forms['insertar']['nombre'].value,
            precio: Number(document.forms['insertar']['precio'].value),
            submit: document.forms['insertar']['submit'].value
        });
        
        fetch('/sistema_CSV', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function(response) {
            if(response.ok) { return response.text(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(text) { 
            submit.value    = 'Crear';
            res.innerHTML   = 'Insertado con exito.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);
            insertar.reset();

            Sistema.obtener();
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    actualizar(actualizar) {
        fetch('/sistema_CSV/' + actualizar, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function (json) {
            res.innerHTML = 'Listo para actualizar.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);
            
            id.value        = json.id;
            marca.value     = json.marca;
            nombre.value    = json.nombre;
            precio.value    = json.precio;
            submit.value    = 'Actualizar'; 
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    eliminar(eliminar) {
        fetch('/sistema_CSV/' + eliminar, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            objeto          = json.reverse(); 
            res.innerHTML   = 'Eliminado con exito.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);

            Sistema.colocar();
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
}
Sistema.obtener();

insertar.onsubmit = function(evento) {
    evento.preventDefault();
    Sistema.insertar();
};
