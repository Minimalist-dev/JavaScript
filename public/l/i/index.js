const nivel = document.querySelectorAll(".nivel");

var i;

class Habilidades {
    static
    mostrar(habilidad) {
        const mostrar   = document.querySelectorAll('.' + habilidad);
        
        let l = nivel.length;
        for (i = 0; i < l; i++) {
            nivel[i].style.display = "none";
        }

        let l2 = mostrar.length;
        for (i = 0; i < l2; i++) {
            mostrar[i].style.display = "block";
        }
    }
}
/* titulo que se hace humo
--------------------------------------------------------------------------------*/
const h1 = document.querySelector('.enlace');

h1.addEventListener('mouseover', function() {
    h1.classList.add('active');
});