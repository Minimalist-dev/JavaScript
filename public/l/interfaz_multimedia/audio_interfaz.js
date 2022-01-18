let audio       = document.querySelector('#original');
let reproducir  = document.querySelector('#reproduccion');
let duracion    = document.querySelector('#tiempo');
let res         = document.querySelector('#res');
let silenciar   = document.querySelector('#mudo');
let volumen     = document.querySelector('#volumen');
let velocidad   = document.querySelector('#velocidad');
let repetir     = document.querySelector('#repeticion');

class Audio {
    constructor() {
        duracion.max = audio.duratio;
        
        window.setInterval(function() { 
            duracion.value  = audio.currentTime;
            res.innerHTML   = duracion.value;
        }, 1000);
        
        duracion.oninput    = function() { audio.currentTime    = duracion.value;       };
        volumen.oninput     = function() { audio.volume         = volumen.value * 0.01; };
        velocidad.oninput   = function() { audio.playbackRate   = velocidad.value;      };
    }
    static
    reproduccion() {
        if(audio.paused === true) {
            audio.play();
            reproducir.innerHTML = "<i class='fas fa-pause'></i>";
        } else {
            audio.pause();
            reproducir.innerHTML = "<i class='fas fa-play'></i>";
        }
    }
    static
    mudo() {
        if(audio.muted === false) {
            audio.muted = true;
            mudo.innerHTML = "<i class='fas fa-volume-mute'></i>";
        } else {
            audio.muted = false;
            mudo.innerHTML = "<i class='fas fa-volume-up'></i>";
        }
    }
    static
    repeticion() {
        if(audio.loop === false) {
            audio.loop = true;
            repetir.innerHTML = "<i class='material-icons'>repeat_one</i>";
        } else {
            audio.loop = false;
            repetir.innerHTML = "<i class='material-icons'>repeat</i>";
        }
    }
}
new Audio();

reproducir.onclick = function() {
    Audio.reproduccion();
};
silenciar.onclick = function() {
    Audio.mudo();
};
repetir.onclick = function() {
    Audio.repeticion();
};