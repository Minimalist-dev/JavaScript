let transmisionLocal;

var peer            = null; // own peer object
var conn            = null;
//var lastPeerId      = null;
let usuarios        = document.querySelector('#usuarios');
let video           = document.createElement('video');
let generarVideo    = document.querySelector('#pausar_video');
let generarAudio    = document.querySelector('#pausar_audio');
let enlaceDeSala    = document.querySelector('#enlace_de_sala');
let charla          = document.querySelector('#charla');
let mensaje         = document.querySelector('#chat_message');
let enviar          = document.querySelector('#enviar');

video.muted = true;

let user = prompt("Enter your name");

let socket = io('/');

/* Video Chat
--------------------------------------------------------------------------------*/
class VideoChat {
    constructor() {
        
    }
    static
    mirar() {
        
    }
    static
    conectar() {
        
    }
}
new VideoChat();

peer = new Peer(null, { debug: 2 });

/* Crear conexión con el par de destino especificado en el campo de entrada
--------------------------------------------------------------------------------*/
conn = peer.connect(SALA_ID, { reliable: true });

peer.on('open', function() {
    socket.emit('join-room', SALA_ID, peer.id, user);
});
peer.on('connection', function (conexion) {
    // Disallow incoming connections
    conexion.on('open', function () {
        conexion.send("Sender does not accept incoming connections");
        
        setTimeout(function () {
            conexion.close();
        }, 500);
    });
});

/* Transmisión: video
--------------------------------------------------------------------------------*/
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(function(stream) {
    transmisionLocal = stream;
    
    agregarVideo(video, stream);

    socket.on('user-connected', function(usuarioID) {
        llamar(usuarioID, stream);
    });
    
    peer.on('call', function(call) {
        let video = document.createElement('video');
        
        call.answer(stream);
        
        call.on('stream', function(remoteStream) {
            agregarVideo(video, remoteStream);
        });
    });
});

socket.on('user-disconnected', function(usuarioID) {
    alert('usuario desconectado: ' + usuarioID);
});
/* Transmisión: chat
--------------------------------------------------------------------------------*/
socket.on('createMessage', function(nombre, mensaje) {
    charla.innerHTML = charla.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${ nombre === user ? "me" : nombre }</span></b>
        <span>${ mensaje }</span>
    </div>`;
});

/* Desconexión
--------------------------------------------------------------------------------*/
peer.on('close', function (evento) {   
    conn = null;
//    console.log('[close] Connection destroyed');
    alert('[close] Connection destroyed'+ evento);
});
peer.on('disconnected', function (evento) {
//    console.log('[disconnected] Connection lost. Please reconnect');
    alert('[disconnected] Connection lost. Please reconnect' + evento);
    
    peer.reconnect();
});
peer.on('error', function (error) {
//    console.log('Error capturado: ' + error);
    alert('Error capturado: ' + error);
});

function 
llamar(usuarioID, stream) {
    let call    = peer.call(usuarioID, stream);
    let video   = document.createElement('video');
    
    call.on('stream', function(remoteStream) {
        agregarVideo(video, remoteStream);
    });
    call.on('close', function () {
        video.remove();
        peer.destroy();
    });
};
let agregarVideo = function(video, stream) {
    video.srcObject = stream;

    video.addEventListener("loadedmetadata", function() {
        video.play();
        usuarios.append(video);
    });
    
//    let totalUsers = document.getElementsByTagName("video").length;
//    
//    if (totalUsers > 1) {
//        for (let index = 0; index < totalUsers; index++) {
//            document.getElementsByTagName("video")[index].style.width =
//                    100 / totalUsers + "%";
//        }
//    }
};

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
generarAudio.onclick = function() {
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
};
generarVideo.onclick = function() {
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
};
enlaceDeSala.onclick = function() {
    prompt(
        "Copy this link and send it to people you want to meet with",
        window.location.href
    );
};

