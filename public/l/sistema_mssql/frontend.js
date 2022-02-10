var objeto, maximo;

let ia        = document.querySelector('#ia');
let consulta  = document.querySelector('#consulta');
let res       = document.querySelector('#res');

let id              = document.querySelector('#id');
let nombre          = document.querySelector('#nombre');
let marca           = document.querySelector('#marca');
let precio          = document.querySelector('#precio');
let submit          = document.querySelector('#submit');

let busqueda    = document.querySelector("#busqueda");
let encontrar   = document.querySelector('#buscar');

let orden       = document.querySelector('#orden');
let por         = document.querySelector('#por');
let paginacion  = document.querySelector('#paginacion');
let pagina      = document.querySelector('#pagina');
let anterior    = document.querySelector('#anterior');
let siguiente   = document.querySelector('#siguiente');

class Sistema {
    static 
    insertar() {
        let datos = JSON.stringify({
            id: id.value, 
            nombre: nombre.value, 
            marca: marca.value,
            precio: precio.value, 
            submit: submit.value
        });

        fetch('/sistema_mssql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            objeto = json.recordset;

            submit.value = 'Insertar';
            res.innerHTML = 'Insertado con exito.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);
            
            ia.reset();
            
            Sistema.leer();
        }).catch(function(error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static 
    posteo(post) {
        fetch('/sistema_mssql/' + post , {
            method: 'GET'
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            objeto = json.recordset;

            res.innerHTML = 'Ordenado con exito.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);
            
            Sistema.leer();
        }).catch(function(error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    buscar(id) {
        fetch('/sistema_mssql/buscar', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ buscar: id})
        }).then(function (response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function (json) { console.log(json);
            objeto = json.recordset;
            
            Sistema.leer();
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static 
    leer() {
        let salida = '';

        for(let i in objeto) {
            let fecha      = new Date(objeto[i].fecha);
        
            salida += `
                <tr>
                    <td>${objeto[i].id}</td>
                    <td>${objeto[i].nombre}</td>
                    <td>${objeto[i].marca}</td>
                    <td>${objeto[i].precio}</td>
                    <td>${new Intl.DateTimeFormat('es').format(fecha)}</td>
                    <td>
                        <button type='submit' onclick="Sistema.editar(${objeto[i].id})">Editar</button>
                    </td> 
                    <td>
                        <button type='button' onclick="Sistema.eliminar(${objeto[i].id})">Eliminar</button>
                    </td>  
                </tr>
            `;  
        }

        if(salida !== '') {
            consulta.innerHTML = salida;
        } else {
            consulta.innerHTML = `
                <tr>
                    <td colspan='9' style='text-align: center; padding: 16px 0px;'>
                        No hay resultados...
                    </td>
                </tr>
            `;
        }
    }
    static
    editar(editar) {
        fetch('/sistema_mssql/editar/' + editar, {
            method: "GET"
        }).then(function (response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function (json) {
            res.innerHTML = 'Listo para actualizar.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);
            
            id.value        = json.recordset[0].id;
            nombre.value    = json.recordset[0].nombre;
            marca.value     = json.recordset[0].marca;
            precio.value    = json.recordset[0].precio;
            submit.value    = 'Actualizar';
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    eliminar(eliminar) { 
        fetch('/sistema_mssql/' + eliminar, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            objeto          = json.recordset; 
            res.innerHTML   = 'Eliminado con exito.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);

            Sistema.leer();
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    limite() {
        fetch('/sistema_mssql/limite/id', {
            method: 'GET'
        }).then(function (response) {
            if (response.ok) { return response.json(); } 
            else { throw "Error en la llamada"; }
        }).then(function (json) { console.log(json.recordset[0].limite);
            maximo = json.recordset[0].limite;
        });
    }
    static
    paginacion() {
        let datos = JSON.stringify({ pagina: pagina.value });
        
        fetch('/sistema_mssql/pagina', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function (response) {
            if (response.ok) { return response.json(); } 
            else { throw "Error en la llamada"; }
        }).then(function (json) {
            objeto = json.recordset;

            Sistema.leer();
        }).catch(function(error) {
            console.log('Error de captura: ' + error.message);
        });

        pagina.value + 5 <= maximo ? anterior.style.visibility = 'hidden' : anterior.style.visibility = 'visible';
        pagina.value >= maximo - 5 ? siguiente.style.visibility = 'hidden' : siguiente.style.visibility = 'visible';
    }
}

/* Disparadores
--------------------------------------------------------------------------------*/
ia.onsubmit = function(evento) {
    evento.preventDefault();
    Sistema.insertar();
};
window.onload = function() {
    Sistema.posteo('get');
    Sistema.limite();
};
busqueda.oninput = function(evento) {
    evento.preventDefault();
    Sistema.buscar(encontrar.value);
};
por.oninput = function() {
    Sistema.posteo(document.querySelector('#himOrHer').value); 
};
orden.oninput = function() {
    Sistema.posteo(document.querySelector('#ordenar').value); 
};

/* Paginación 
--------------------------------------------------------------------------------*/
anterior.onclick = function () {
    pagina.stepDown(5);
    Sistema.paginacion();
};
siguiente.onclick = function () {
    pagina.stepUp(5);
    Sistema.paginacion();
};
paginacion.oninput = function () {
    Sistema.paginacion();
};
