let indice;

let diapositivas    = document.querySelectorAll(".diapositiva");
let botones         = document.querySelectorAll(".punto");
let ver             = document.querySelectorAll(".ver");

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


