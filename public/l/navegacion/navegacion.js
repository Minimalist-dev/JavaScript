const categoria = document.querySelectorAll('.categoria');
const grupo     = document.querySelectorAll('.grupo');

class Navegacion {
    constructor() { 
    
    }
    static
    alEstarEncima() {
        for (let i of categoria) {
            i.addEventListener('mouseover', function(evento) {
                let posicion = i.classList.item(1);
                
                for (let i = 0; i < grupo.length; i++) {
                    grupo[i].style.display = "none";
                    categoria[i].className = categoria[i].className.replace(" categoria-activa", "");
                }

                document.querySelector('#grupo'+posicion.substr(1, 1)).style.display = "block";
                evento.currentTarget.className += " categoria-activa";
            });
        }
    }
    static
    alHacerClic() {
        for (let i of categoria) {
            i.addEventListener('click', function(evento) {
                let posicion = i.classList.item(1);
                
                for (let i = 0; i < grupo.length; i++) {
                    grupo[i].style.display = "none";
                    categoria[i].className = categoria[i].className.replace(" categoria-activa", "");
                }

                document.querySelector('#grupo'+posicion.substr(1, 1)).style.display = "none";
                evento.currentTarget.className.replace(" categoria-activa", "");
            });
        }
    }
}
Navegacion.alEstarEncima();
Navegacion.alHacerClic();
