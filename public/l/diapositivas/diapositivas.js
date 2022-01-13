var indice = 0, autoDetener;

const main  = document.querySelector("main");
const punto = document.querySelectorAll(".punto");

class Diapositivas {
    constructor() {
        main.onmouseover = function() {
            clearTimeout(autoDetener);
            main.classList.add('detener');
            main.classList.remove('continuar');
        };

        main.onmouseout = function() {
            autoDetener = setTimeout(this.automaticas, 4000);
        };
    }
    static
    cordenadas() {
        Diapositivas.mas(1);
        main.classList.add('continuar');
        main.classList.remove('detener');
    }
    static
    mas(posicion) {
        Diapositivas.automaticas(indice += posicion - 1);
        clearTimeout(autoDetener);
    }
    static
    actual() {
        for (let i of punto) {
            i.addEventListener('click', function() {
                let posicion = i.classList.item(1);

                Diapositivas.automaticas(indice = posicion.substr(1, ) - 1);
                clearTimeout(autoDetener);
            });
        }
    }
    static
    automaticas() {
        const diapositivas = document.querySelectorAll(".diapositiva");
        const punto = document.querySelectorAll(".actual");

        for (let i = 0; i < diapositivas.length; i++) {
            diapositivas[i].style.display = "none";  
        }
        for (let i = 0; i < punto.length; i++) {
            punto[i].className = punto[i].className.replace(" activo", "");
        }

        indice++;
        
        if (indice > diapositivas.length) { indice = 1; }   
        if (indice < 1)                   { indice = diapositivas.length; }

        diapositivas[indice - 1].style.display = "block";  
        punto[indice - 1].className += " activo";

        autoDetener = setTimeout(Diapositivas.automaticas, 4000);
    }
}
new Diapositivas();
Diapositivas.automaticas();
Diapositivas.actual();
main.addEventListener('mousemove', Diapositivas.cordenadas);
