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

peer = new Peer(null, { debug: 2 });

/* Crear conexión con el par de destino especificado en el campo de entrada
--------------------------------------------------------------------------------*/
conn = peer.connect(SALA_ID, { reliable: true });

peer.on("open", function() {
    // Workaround for peer.reconnect deleting previous id
//    if (peer.id === null) {//console.log('Received null id from peer open');
//        peer.id = lastPeerId;
//    } else {
//        lastPeerId = peer.id;
//    }  
    
    socket.emit('join-room', SALA_ID, peer.id, user)
});
peer.on('connection', function (c) { console.log(c);
    // Disallow incoming connections
    c.on('open', function () {
        c.send("Sender does not accept incoming connections");
        setTimeout(function () {
            c.close();
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
    
//    transmisionLocal.getAudioTracks()[0].enabled = false;

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

/* Transmisión: chat
--------------------------------------------------------------------------------*/
socket.on('createMessage', function(message, userName) {
    charla.innerHTML = charla.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${ userName === user ? "me" : userName }</span></b>
        <span>${message}</span>
    </div>`;
});
peer.on('disconnected', function () {//console.log('Connection lost. Please reconnect');
    alert('Connection lost. Please reconnect');

    // Workaround for peer.reconnect deleting previous id
//    peer.id = lastPeerId;
//    console.log(peer.id, lastPeerId);
//    peer._lastServerId = lastPeerId;
//    console.log(peer._lastServerId, lastPeerId);
    peer.reconnect();
});
peer.on('close', function () {
    conn = null;
    alert('Connection destroyed. Please refresh');
    console.log('Connection destroyed');
});
peer.on('error', function (err) {
    console.log(err);
    alert('Error capturado: ' + err);
});

function llamar(usuarioID, stream) {
    let call    = peer.call(usuarioID, stream);
    let video   = document.createElement('video');
    
    call.on('stream', function(remoteStream) {
        agregarVideo(video, remoteStream);
    });
//    call.on('close', () => {
//        video.remove();
//    });
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

