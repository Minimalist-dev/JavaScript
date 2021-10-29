let transmisionLocal;

let videoGrid       = document.getElementById("usuarios");
let video           = document.createElement("video");
let stopVideo       = document.querySelector("#pausar_video");
let muteButton      = document.querySelector("#pausar_audio");
let enlaceDeSala    = document.querySelector("#enlace_de_sala");
let messages        = document.querySelector('#charla');
let text            = document.querySelector('#chat_message');
let send            = document.querySelector('#send');

video.muted = true;

let user = prompt("Enter your name");

let socket = io('/');

const peer = new Peer(null, {
    debug: 2
});

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => { //console.log("then: ",  stream);
    transmision = stream;
    
    agregarVideo(video, stream);

    peer.on('call', call => { //console.log("call: ",  call);
        let video = document.createElement('video');
        
        call.answer(stream);
        
        call.on('stream', userVideoStream => { //console.log("stream: ",  userVideoStream);
            agregarVideo(video, userVideoStream);
        });
    });

    socket.on('user-connected', userId => { console.log(userId);
        connectToNewUser(userId, stream);
    });
});

// Create connection to destination peer specified in the input field
conn = peer.connect(SALA_ID, {
    reliable: true
});

peer.on("open", function() {
    // Workaround for peer.reconnect deleting previous id
    if (peer.id === null) {
        console.log('Received null id from peer open');
        peer.id = lastPeerId;
    } else {
        lastPeerId = peer.id;
    }  
    
    socket.emit('join-room', SALA_ID, peer.id, user)
//    console.log('ID: ' + peer.id, "Connected to: " + conn.peer);
});
peer.on('connection', function (c) {
    // Disallow incoming connections
    c.on('open', function () {
        c.send("Sender does not accept incoming connections");
        setTimeout(function () {
            c.close();
        }, 500);
    });
});
peer.on('disconnected', function () {
    status.innerHTML = "Connection lost. Please reconnect";
    console.log('Connection lost. Please reconnect');

    // Workaround for peer.reconnect deleting previous id
    peer.id = lastPeerId;
    peer._lastServerId = lastPeerId;
    peer.reconnect();
});
peer.on('close', function () {
    conn = null;
    status.innerHTML = "Connection destroyed. Please refresh";
    console.log('Connection destroyed');
});
peer.on('error', function (err) {
    console.log(err);
    alert('' + err);
});

function connectToNewUser(userId, stream) {console.log("transmisionLocal: ", stream);
    let call    = peer.call(userId, stream);
    let video   = document.createElement('video');
    
    call.on('stream', userVideoStream => {console.log("userVideoStream: ",  userVideoStream);
        agregarVideo(video, userVideoStream);
    });
    call.on('close', () => {
        video.remove();
    });
};
let agregarVideo = function(video, stream) {
    video.srcObject = stream;
    
    video.addEventListener("loadedmetadata", () => {
        video.play();
        videoGrid.append(video);
    });
};
socket.on('createMessage', function(message, userName) { //console.log(message, userName);
    messages.innerHTML =
            messages.innerHTML +
            `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${
            userName === user ? "me" : userName
            }</span> </b>
        <span>${message}</span>
    </div>`;
});
send.onclick = function() {
    if (text.value.length !== 0) {
        socket.emit('message', text.value);
        text.value = "";
    }
};

text.onkeydown = function(evento) {
    if (evento.key === "Enter" && text.value.length !== 0) {
        socket.emit('message', text.value);
        text.value = "";
    }
};
muteButton.onclick = function() {
    let enabled = transmisionLocal.getAudioTracks()[0].enabled;
    if (enabled) {
        transmisionLocal.getAudioTracks()[0].enabled = false;
//        html = `<i class="fas fa-microphone-slash"></i>`;
        muteButton.classList.toggle("pausa");
        muteButton.innerHTML = `<i class="fas fa-microphone-slash"></i>`;
    } else {
        transmisionLocal.getAudioTracks()[0].enabled = true;
//        html = `<i class="fas fa-microphone"></i>`;
        muteButton.classList.toggle("pausa");
        muteButton.innerHTML =  `<i class="fas fa-microphone"></i>`;
    }
};
stopVideo.onclick = function() {
    let enabled = transmisionLocal.getVideoTracks()[0].enabled;
    if (enabled) {
        transmisionLocal.getVideoTracks()[0].enabled = false;
//        html = `<i class="fas fa-video-slash"></i>`;
        stopVideo.classList.toggle("pausa");
        stopVideo.innerHTML = `<i class="fas fa-video-slash"></i>`;
    } else {
        transmisionLocal.getVideoTracks()[0].enabled = true;
//        html = `<i class="fas fa-video"></i>`;
        stopVideo.classList.toggle("pausa");
        stopVideo.innerHTML = `<i class="fas fa-video"></i>`;
    }
};

enlaceDeSala.onclick = function() {
    prompt(
        "Copy this link and send it to people you want to meet with",
        window.location.href
    );
};




