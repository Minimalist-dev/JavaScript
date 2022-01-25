let indice;

let diapositivas    = document.querySelectorAll('.diapositiva');
let botones         = document.querySelectorAll('.punto');
let ver             = document.querySelectorAll('.ver');

class Diapositivas {
    static
    actual() {
        for (let i of botones) {
            i.addEventListener('click', function() {
                let posicion = i.classList.item(1);

                Diapositivas.multiDinamica(indice = posicion.substr(1, ));
            });
        }
    }
    static
    multiDinamica() {
        if (indice > diapositivas.length) { indice = 1; }   
        if (indice < 1)                   { indice = diapositivas.length; }
        
        for (let i = 0; i < diapositivas.length; i++) {
            diapositivas[i].style.display = "none";  
        }
        for (let i = 0; i < ver.length; i++) {
            ver[i].className = ver[i].className.replace(" viendo", "");
            botones[i].className = botones[i].className.replace(" activo", "");
        }

        diapositivas[indice - 1].style.display = "block";  
        
        var int = Math.abs((diapositivas.length + 1) - Number(indice));
        
        ver[int - 1].className += " viendo";
        botones[int - 1].className += " activo";
    }
}

/* Disparadores
--------------------------------------------------------------------------------*/
Diapositivas.actual();

/* Animaciones
--------------------------------------------------------------------------------*/
const cajasContainer = document.querySelector('#cajas');
const rotarZ = document.querySelector('#rotarZ');

const CAJAS = 8;

const anchoDeCaja = Math.ceil(cajasContainer.clientWidth / CAJAS);
const altoDeCaja  = Math.ceil(cajasContainer.clientHeight / CAJAS);

function 
crearCajas() {
    for (let i = 0; i < CAJAS; i++) {
        for (let j = 0; j < CAJAS; j++) {
            const caja = document.createElement('div');
            caja.classList.add('caja');
            caja.style.width = anchoDeCaja + 'px';
            caja.style.height = altoDeCaja + 'px';
            caja.style.backgroundPosition = `${-anchoDeCaja * j}px ${-altoDeCaja * i}px`;
            cajasContainer.appendChild(caja);
        }
    }
}

crearCajas();

rotarZ.addEventListener('click', function() {
    cajasContainer.classList.toggle('rotarZ');
});

/*
    * olas...........................................................................  
*/
//let olasID = document.querySelector('#olas');
//let oleada  = document.querySelector('#oleada');
//
//const BLOQUES = 4;
//let bloques   = [];
//let ola       = [];
//
//let ancho = Math.ceil(olasID.clientWidth / BLOQUES);
//let alto  = Math.ceil(olasID.clientHeight / BLOQUES);
//
//oleada.onclick = function() {
////    olaDetenida();
//    crearBloques();
//};
//
//function 
//crearBloques() {
//    for (let i = 0; i < BLOQUES; i++) {
//        let agregarBloque   = [];
//        ola[i]              = [];
//        
//        for (let j = 0; j < BLOQUES; j++) {
//            const bloque = document.createElement('div');
//
//            bloque.classList.add('bloque');
//
//            bloque.style.width = ancho + 'px';
//            bloque.style.height = alto + 'px';
//            bloque.style.backgroundPosition = `${-ancho * j}px ${-alto * i}px`;
//            olasID.appendChild(bloque);
//            
//            agregarBloque.push(bloque);
//            ola[i].push(bloque);
//        }
//        
//        bloques.push(agregarBloque);
//    }
//}
//
////crearBloques();
//
///* Eliminar olasID
//--------------------------------------------------------------------------------*/
////function 
////olaDetenida() {
////    ola = [];
////    
////    bloques.forEach((function(bloque, i) {
////        bloque.forEach(function(bloque, j) {
////            bloque.remove();
////        });
////    }));
////
////    bloques.splice(0, bloques.length);
////}
//
////window.onload = function() {
////    olaEscalada(Math.floor(Math.random() * BLOQUES), Math.floor(Math.random() * BLOQUES));
////};
//
//ola.forEach(function(bloque, i) {
//    bloque.forEach(function(bloque, j) {
//        bloque.onclick = function() {
//            olaEscalada(i, j);
//        };
//    });
//});
//
//function 
//olaEscalada(i, j) {
//    if (ola[i] && ola[i][j]) {
//        if (!ola[i][j].classList.contains('crecer')) {
//            ola[i][j].classList.add('crecer');
//            
//            setTimeout(function() {
//                olaEscalada(i - 1, j);
//                olaEscalada(i + 1, j);
//                olaEscalada(i, j - 1);
//                olaEscalada(i, j + 1);
//            }, 100);
//
//            setTimeout(function(){
//                ola[i][j].classList.remove('crecer');
//            }, 300);
//        }
//    }
//}
const olasID        = document.querySelector('#olas');
const oleada        = document.querySelector('#oleada');

const BLOQUES   = 20;
let bloques     = [];
let ola         = [];

const anchoDeBloque = Math.ceil(olasID.clientWidth / BLOQUES);
const altoDeBloque  = Math.ceil(olasID.clientHeight / BLOQUES);

oleada.onclick = function() {
//    limpiarBloques();
    crearBloques();
};
function 
crearBloques() {
    for (let i = 0; i < BLOQUES; i++) {
        let agregarBloque = [];
        ola[i]              = [];

        for (let j = 0; j < BLOQUES; j++) {
            let bloque = document.createElement('div');
            
            bloque.classList.add('bloque');
            bloque.style.width = anchoDeBloque + 'px';
            bloque.style.height = altoDeBloque + 'px';
            bloque.style.backgroundPosition = `${-anchoDeBloque * j}px ${-altoDeBloque * i}px`;
            
            
            olasID.appendChild(bloque);
            agregarBloque.push(bloque);
            ola[i].push(bloque);
        }
        
        bloques.push(agregarBloque);
    }

//    setTimeout(function() {
//        animarBloques();
//    }, 1000);
}

crearBloques();
//
//function 
//animarBloques() {
//    bloques.forEach(function(agregarBloque, i) {
//        agregarBloque.forEach(function(bloque, j) {
//            bloque.style.top = (altoDeBloque * i) + 'px';
//            bloque.style.left = (anchoDeBloque * j) + 'px';
//
////            escalarBloques(Math.floor(Math.random() * BLOQUES), Math.floor(Math.random() * BLOQUES));
//            
////            bloque.onclick = function() {
////                escalarBloques(i, j);
////            };
//        });
//    });
//}

ola.forEach(function(caja, i) {
    caja.forEach(function(caja, j) {
        caja.onclick = function() {
            olaEscalada(i, j);
        };
    });
});

function 
limpiarBloques() {
    bloques.forEach(function(agregarBloque, i) {
        agregarBloque.forEach(function(bloque, j) {
            bloque.remove();
        });
    });

    bloques.splice(0, bloques.length);
}
function 
escalarBloques(i, j) {
    if (bloques[i] && bloques[i][j]) {
        if (!bloques[i][j].classList.contains('crecer')) {
            bloques[i][j].classList.add('crecer');
            setTimeout(function() {
                escalarBloques(i - 1, j);
                escalarBloques(i + 1, j);
                escalarBloques(i, j - 1);
                escalarBloques(i, j + 1);
            }, 100);

            setTimeout(function() {
                bloques[i][j].classList.remove('crecer');
            }, 300);
        }
    }
}