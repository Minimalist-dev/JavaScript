let transmisionLocal;

var peer            = null; // own peer object
var conn            = null;
var ultimoID        = null;
let usuarios        = document.querySelector('#usuarios');
let video           = document.createElement('video');
let generarVideo    = document.querySelector('#pausar_video');
let generarAudio    = document.querySelector('#pausar_audio');
let enlaceDeSala    = document.querySelector('#enlace_de_sala');
let charla          = document.querySelector('#charla');
let mensaje         = document.querySelector('#chat_message');
let enviar          = document.querySelector('#enviar');
let cerrar          = document.querySelector('#cerrar');

let alias   = prompt("Ingresar nombre");
let socket  = io('/');

/* Video Chat
--------------------------------------------------------------------------------*/
class VideoChat {
    constructor() {
        video.muted = true;
    }
    static
    mirar() {
        peer = new Peer(null, { debug: 2 });
        
        peer.on('open', function() {
            // Solución alternativa para peer.reconnect eliminando la identificación anterior
            peer.id === null ? peer.id = ultimoID : ultimoID = peer.id;
            
            socket.emit('join-room', SALA_ID, peer.id, alias);
        });
        
        peer.on('connection', function (conexion) {
            // Disallow incoming connections
            if (conn && conn.open) {
                conexion.on('open', function () {
    //                conexion.send("Sender does not accept incoming connections");
                    setTimeout(function () {
                        conexion.close();
                    }, 500);
                });
                return;
            }
        });
        
        peer.on('disconnected', function () {
            alert('[disconnected] Connection lost. Please reconnect');
            // Solución alternativa para peer.reconnect eliminando la identificación anterior
            peer.id             = ultimoID;
            peer._lastServerId  = ultimoID;
            
            peer.reconnect();
        });
        
        peer.on('close', function() {   
            conn = null;

            alert('[close] Connection destroyed');
        });
        
        peer.on('error', function (error) {
            alert('[Error] ' + error);
        });
    }
    static
    conectar() {
        // Cerrar conexión antigua
        if (conn) { conn.close(); }
        
        conn = peer.connect(SALA_ID, { reliable: true });
        
        conn.on('close', function (cerrar) {   
            conn = null;

            alert('[close] Connection closed ' + cerrar);
        });
    }
    static
    llamar(usuarioID, stream) {
        let call    = peer.call(usuarioID, stream);
        let video   = document.createElement('video');

        call.on('stream', function(remoteStream) {
            VideoChat.agregarVideo(video, remoteStream);
        });
        
        call.on('close', function () {
            video.remove();
            peer.destroy();
        });
    };
    static
    respuesta() {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(function(stream) {
            transmisionLocal = stream;

            VideoChat.agregarVideo(video, stream);

            socket.on('user-connected', function(usuarioID) {
                VideoChat.llamar(usuarioID, stream);
            });

            peer.on('call', function(call) {
                let video = document.createElement('video');

                call.answer(stream);

                call.on('stream', function(remoteStream) {
                    VideoChat.agregarVideo(video, remoteStream);
                });
            });
        });
    }
    static
    agregarVideo(video, stream) {
        video.srcObject = stream;

        video.addEventListener("loadedmetadata", function() {
            video.play();
            usuarios.append(video);
        });
    };
    static
    estadoDeVideo() {
        let estadoDeVideo = transmisionLocal.getVideoTracks()[0].enabled;
    
        if (estadoDeVideo) {
            transmisionLocal.getVideoTracks()[0].enabled = false;
            generarVideo.classList.toggle("pausa");
            generarVideo.innerHTML = `<i class="fas fa-video-slash"></i>`;
        } else {
            transmisionLocal.getVideoTracks()[0].enabled = true;
            generarVideo.classList.toggle("pausa");
            generarVideo.innerHTML = `<i class="fas fa-video"></i>`;
        }
    }
    static
    estadoDeAudio() {
        let estadoDeAudio = transmisionLocal.getAudioTracks()[0].enabled;
    
        if (estadoDeAudio) {
            transmisionLocal.getAudioTracks()[0].enabled = false;
            generarAudio.classList.toggle("pausa");
            generarAudio.innerHTML = `<i class="fas fa-microphone-slash"></i>`;
        } else {
            transmisionLocal.getAudioTracks()[0].enabled = true;
            generarAudio.classList.toggle("pausa");
            generarAudio.innerHTML =  `<i class="fas fa-microphone"></i>`;
        }
    }
}
new VideoChat();
VideoChat.mirar();
VideoChat.conectar();
VideoChat.respuesta();

/* Transmisión: chat
--------------------------------------------------------------------------------*/
socket.on('createMessage', function(nombre, mensaje) {
    charla.innerHTML = charla.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${ nombre === alias ? "me" : nombre }</span></b>
        <span>${ mensaje }</span>
    </div>`;
});
socket.on('user-disconnected', function(usuarioID) {
    alert('usuario desconectado: ' + usuarioID);
});

/* Disparadores de eventos
--------------------------------------------------------------------------------*/
enviar.onclick = function() {
    if (mensaje.value.length !== 0) {
        socket.emit('message', mensaje.value);
        mensaje.value = '';
    }
};
mensaje.onkeydown = function(evento) {
    if (evento.key === 'Enter' && mensaje.value.length !== 0) {
        socket.emit('message', mensaje.value);
        mensaje.value = '';
    }
};
generarVideo.onclick = function() {
    VideoChat.estadoDeAudio();
};
generarAudio.onclick = function() {
    VideoChat.estadoDeAudio();
};
enlaceDeSala.onclick = function() {
    prompt(
        "Copy this link and send it to people you want to meet with",
        window.location.href
    );
};
cerrar.onclick = function() {
    window.history.back();
};
