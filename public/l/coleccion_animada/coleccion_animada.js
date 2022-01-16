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
const boxesContainer = document.getElementById('boxes');
const btn = document.getElementById('btn');

const anchoDeCaja = Math.ceil(boxesContainer.clientWidth / 4);
const altoDeCaja  = Math.ceil(boxesContainer.clientHeight / 4);

btn.addEventListener('click', () => {
    boxesContainer.classList.toggle('big');
});

function 
createBoxes() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let box = document.createElement('div');
            box.classList.add('box');
            box.style.width = anchoDeCaja + 'px';
            box.style.height = altoDeCaja + 'px';
            box.style.backgroundPosition = `${-anchoDeCaja * j}px ${-altoDeCaja * i}px`;
            boxesContainer.appendChild(box);
        }
    }
}

createBoxes();

/*
    * olas...........................................................................  
*/
const olasID        = document.querySelector('#olas');
const oleada        = document.querySelector('#oleada');

const BLOQUES   = 20;
let bloques     = [];

const anchoDeBloque = Math.ceil(olasID.clientWidth / BLOQUES);
const altoDeBloque  = Math.ceil(olasID.clientHeight / BLOQUES);

oleada.onclick = function() {
    limpiarBloques();
    crearBloques();
};
function 
crearBloques() {
    for (let i = 0; i < BLOQUES; i++) {
        let agregarBloque = [];

        for (let j = 0; j < BLOQUES; j++) {
            let bloque = document.createElement('div');
            
            bloque.classList.add('bloque');
            bloque.style.width = anchoDeBloque + 'px';
            bloque.style.height = altoDeBloque + 'px';
            bloque.style.backgroundPosition = `${-anchoDeBloque * j}px ${-altoDeBloque * i}px`;
            
            agregarBloque.push(bloque);
            olasID.appendChild(bloque);
        }
        
        bloques.push(agregarBloque);
    }

    setTimeout(function() {
        animarBloques();
    }, 1000);
}
function 
animarBloques() {
    bloques.forEach(function(agregarBloque, i) {
        agregarBloque.forEach(function(bloque, j) {
            bloque.style.top = (altoDeBloque * i) + 'px';
            bloque.style.left = (anchoDeBloque * j) + 'px';

            escalarBloques(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20));
            
            bloque.onclick = function() {
                escalarBloques(i, j);
            };
        });
    });
}
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