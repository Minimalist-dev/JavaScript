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
        audio.ontimeupdate = function() {
            Audio.pausar();
            
            duracion.max    = audio.duration;
            duracion.value  = audio.currentTime;
            res.innerHTML   = Audio.segundos(audio.currentTime);
        };
       
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
    pausar() {
        if(audio.duration === audio.currentTime) {
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
    static
    segundos(currentTime) {
        let tiempoActual    = Math.round(currentTime);
        let segundosTotales = parseInt(tiempoActual); //convertirlo en entero (opcional)
        
        let horas           = Math.floor(segundosTotales / 3600);
        let minutos         = Math.floor((segundosTotales - (horas * 3600)) / 60);
        let segundos        = segundosTotales - (horas * 3600) - (minutos * 60);

        if (horas   < 10)   { horas    = "0" + horas;    }
        if (minutos < 10)   { minutos  = "0" + minutos;  }
        if (segundos < 10)  { segundos = "0" + segundos; }
        
        let tiempo = horas + ':' + minutos + ':' + segundos;
        
        return tiempo;
    } 
}
/* Disparadores
--------------------------------------------------------------------------------*/
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
