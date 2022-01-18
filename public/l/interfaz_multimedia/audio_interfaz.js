let audio       = document.querySelector('#original');
let volumen     = document.querySelector('#volumen');
let velocidad   = document.querySelector('#velocidad');
let duracion    = document.querySelector('#duracion');

class Audio {
    constructor() {
        duracion.max = audio.duratio;
        
        window.setInterval(function()    { duracion.value       = audio.currentTime;    }, 1000);
        
        duracion.oninput    = function() { audio.currentTime    = duracion.value;       };
        volumen.oninput     = function() { audio.volume         = volumen.value * 0.01; };
        velocidad.oninput   = function() { audio.playbackRate   = velocidad.value;      };
    }
    static 
    reproducir() { 
        audio.play(); 
    } 
    static 
    pausar() { 
        audio.pause(); 
    } 
    static
    muteSi() { 
        audio.muted = true;
    } 
    static 
    muteNo() { 
        audio.muted = false;
    }
    static 
    repetirSi() { 
        audio.loop = true;
    } 
    static 
    repetirNo() { 
        audio.loop = false;
    } 
}
new Audio();
