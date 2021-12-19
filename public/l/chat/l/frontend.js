var objeto;  

var desplazarse = document.querySelector('.charla');
let charla      = document.querySelector('#charla');
var escribiendo = document.querySelector('#escribiendo');
let emisor      = document.querySelector('#emisor');
var entrada     = document.querySelector('#entrada');

var usuarios        = document.querySelector('#user');

let alias = prompt("Ingresar alias...");

var emitirConexion      = { estado: 'Conectado', alias: alias   };
var emitirEscribiendo   = { estado: 'Escribiendo', alias: alias };
var emitirDesescribir   = { estado: 'Desescribir', alias: alias };

/* Socket
--------------------------------------------------------------------------------*/
var socket  = io();

localStorage.setItem("nombre", alias);

socket.emit('chat message', emitirConexion);

socket.on('chat message', function(emitir) { //console.log(emitir);
    var elemento    = document.createElement('li');
    var nombre      = localStorage.getItem("nombre");

    if(emitir.estado === 'Conectado') {
        elemento.innerHTML = "<b>Usuario:</b> " + emitir.alias + " <i style='color: green'>" + emitir.estado + "</i>";
        usuarios.appendChild(elemento);
    } else if(emitir.estado === 'Desconectado') {
        elemento.innerHTML = "<b>Usuario:</b> " + nombre + " <i style='color: red'>" + emitir.estado + "</i>";
        usuarios.appendChild(elemento);
    } else if(emitir.estado === 'Escribiendo') {
        if(alias !== emitir.alias) {
            escribiendo.innerHTML = "<b>" + emitir.alias + "</b> esta escribiendo...";

            setTimeout(function() {
                escribiendo.innerHTML = '';
                socket.emit('chat message', emitirDesescribir);
            }, 4000);
        } else {
            escribiendo.innerHTML = '';
        }
    } else if(emitir.estado === 'Desescribir') {
        escribiendo.innerHTML = '';
    } else {
        Chat.obtener(emitir);
    }
    
    window.scrollTo(0, document.body.scrollHeight);
});

/* Chat
--------------------------------------------------------------------------------*/
class Chat {
    
    static
    colocar() {
        fetch("../s_db/l/chat/db.json", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            objeto = json;

            Chat.obtener(objeto);
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static 
    obtener(objeto) {
        let salida = '';

        for(let i in objeto) {
            salida += `
                <div class="message">
                    <b>
                        <i class="far fa-user-circle"></i> 
                        <span>${objeto[i].nombre}</span>
                    </b>
                    <span>${objeto[i].entrada}</span>
                </div>
            `;  
        }

        if(salida !== '') {
            charla.innerHTML = salida;
        } else {
            charla.innerHTML = `
                <div class="message">
                    <b>
                        <i class="far fa-user-circle"></i> 
                        <span>John Doe</span>
                    </b>
                    <span>No ha resultados...</span>
                </div>
            `;
        }
        
        charla.scrollIntoView(false);
    }
    static
    emisor() {        
//        let nombre  = document.forms['emisor']['nombre'].value;
        let mensaje = document.forms["emisor"]["entrada"].value;
        
        let datos   = JSON.stringify({ nombre: alias, entrada: mensaje });
        
        fetch('/i/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) { //console.log(json);
            objeto          = json;

            entrada.value = '';
            
            socket.emit('chat message', objeto);
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
}
Chat.colocar();

emisor.onsubmit = function(evento) {
    evento.preventDefault();
    Chat.emisor();
};


entrada.onkeydown = function(evento) {
    socket.emit('chat message', emitirEscribiendo);
};

/* Emojis
--------------------------------------------------------------------------------*/
class Emojis {
    static
    contenidos() {
        const emojisContenidos  = document.querySelector('.emojis-contenidos');
        
        if (emojisContenidos.style.display === "block") { 
            emojisContenidos.style.display = "none"; 
        } else { 
            emojisContenidos.style.display = "block"; 
        }
    }
    static
    emoji(evento) { 
        var emoji = evento.target;
        var mensaje = document.querySelector('textarea');

        mensaje.value = mensaje.value + ' ' + emoji.innerHTML;
    }
//    static
//    reiniciar() {
//        const limpiar = document.querySelector('.n-grid > .area-3 > form ');
//        
//        limpiar.reset();
//    }
}

/* Identidad: los que no funciones ejecutarlos en la parte del servidor
--------------------------------------------------------------------------------*/
//El número de clientes conectados actualmente.
//const count = socket.engine.clientsCount;
// may or may not be similar to the count of Socket instances in the main namespace, depending on your usage
//const count2 = socket.of("/").sockets.size;
//console.log(count);
//console.log(count2);
//console.log(socket.headers);
//console.log(socket.time);
//console.log(socket.address);
//console.log(socket.xdomain);
//console.log(socket.secure);
//console.log(socket.issued);
//console.log(socket.url);
//console.log(socket.query);
//console.log(socket.auth);

//socket.io.engine.transport.name
//console.log(socket);
//console.log(socket.io.engine);
//console.log(socket.io.engine.opts);
//console.log(socket.ids);
//console.log(socket.id);
//console.log(socket.io.engine.hostname);
//console.log(socket.io.engine.id);
//console.log(socket.io);