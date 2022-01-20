let pantalla    = document.querySelector('main');
let audio       = document.querySelector('#original');
let reproducir  = document.querySelector('#reproduccion');
let duracion    = document.querySelector('#tiempo');
let res         = document.querySelector('#res');
let silenciar   = document.querySelector('#mudo');
let volumen     = document.querySelector('#volumen');
let velocidad   = document.querySelector('#velocidad');
let repetir     = document.querySelector('#repeticion');
let expandir    = document.querySelector('#maximizar');

class Audio {
    constructor() {  
        audio.controls  = false;
        audio.poster    = "../../i_img/i/neury-dev.jpg";
        
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
    maximizar() {
        if (pantalla.requestFullscreen)            { pantalla.requestFullscreen();        } 
        else if (pantalla.mozRequestFullScreen)    { pantalla.mozRequestFullScreen();     } 
        else if (pantalla.webkitRequestFullscreen) { pantalla.webkitRequestFullscreen();  } 
        else if (pantalla.msRequestFullscreen)     { pantalla.msRequestFullscreen();      }
        
        if (document.exitFullscreen)            { document.exitFullscreen();         } 
        else if (document.mozCancelFullScreen)  { document.mozCancelFullScreen();    } 
        else if (document.webkitExitFullscreen) { document.webkitExitFullscreen();   } 
        else if (document.msExitFullscreen)     { document.msExitFullscreen();       }  
    }
    static
    minimizar() {
        if(expandir.innerHTML == "<i class='fas fa-expand'></i>" || expandir.innerHTML == `<i class="fas fa-expand" aria-hidden="true"></i>`) {
            expandir.innerHTML = "<i class='fas fa-compress'></i>";
        } else {
            expandir.innerHTML = "<i class='fas fa-expand'></i>";
        }
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
expandir.onclick = function() {
    Audio.maximizar();
    Audio.minimizar();
};

