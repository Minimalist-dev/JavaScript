var objeto, maximo;

let ia        = document.querySelector('#ia');
let consulta  = document.querySelector('#leer');
let res       = document.querySelector('#res');

let id              = document.querySelector('#id');
let nombre          = document.querySelector('#nombre');
let clasificacion   = document.querySelector('#clasificacion');
let tematica        = document.querySelector('#tematica');
let nivel           = document.querySelector('#nivel');
let enlace          = document.querySelector('#enlace');
let submit          = document.querySelector('#submit');

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
            id: id.value, nombre: nombre.value, clasificacion: clasificacion.value,
            tematica: tematica.value, nivel: nivel.value, enlace: enlace.value, submit: submit.value
        });

        fetch('/sistema_mssql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            objeto = json;

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
            objeto = json;

            res.innerHTML = 'Ordenado con exito.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);
            
            Sistema.leer();
        }).catch(function(error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static 
    leer() {
        let salida = '';

        for(let i in objeto) {
            let fecha = new Date(objeto[i].fecha);

            salida += `
                <tr>
                    <td>${objeto[i].id}</td>
                    <td title="${objeto[i].nombre}">${objeto[i].nombre}</td>
                    <td title="${objeto[i].clasificaciones}">${objeto[i].clasificaciones}</td>
                    <td title="${objeto[i].tematicas}">${objeto[i].tematicas}</td>
                    <td>${objeto[i].nivel}</td>
                    <td title="${objeto[i].enlace}"><a href="${objeto[i].enlace}" target="_blank">Abrir</a></td>
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
            
            id.value            = json[0].id;
            nombre.value        = json[0].nombre;
            clasificacion.value = json[0].clasificaciones;
            tematica.value      = json[0].tematicas;
            nivel.value         = json[0].nivel;
            enlace.value        = json[0].enlace;
            submit.value        = 'Actualizar';
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
            objeto          = json; 
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
        }).then(function (json) {
            maximo = json[0].limite;
        });
    }
    static
    paginacion() {
//        let datos = JSON.stringify({ pagina: document.querySelector('#pagina').value });
        let datos = JSON.stringify({ pagina: pagina.value });
        
        fetch('/sistema_mssql/pagina', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function (response) {
            if (response.ok) { return response.json(); } 
            else { throw "Error en la llamada"; }
        }).then(function (json) {
            objeto = json;

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
