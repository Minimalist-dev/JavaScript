var detonador;
/* Header
--------------------------------------------------------------------------------*/
function 
mediano() {
    detonador = document.querySelector(".mediano");
    
    if (detonador.style.display === "block") { detonador.style.display = "none"; } 
    else { detonador.style.display = "block"; }
}
function 
minimo() {
    detonador = document.querySelector(".minimo");
    detonador.classList.toggle("display");
}
/* Ajuste del header a bajar 80px
--------------------------------------------------------------------------------*/
window.onscroll = function () { desplazarse(); };

function 
desplazarse() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.querySelector('header').style.padding = "0.50em 3em 0.50em 3em";
        document.querySelector('h1').style.fontSize = "1.00em";
        document.querySelector('.mediano').style.top = "31px";
        document.querySelector('.minimo').style.top = "31px";
    } else {
        document.querySelector('header').style.padding = "1.50em 3em 1.50em 3em";
        document.querySelector('h1').style.fontSize = "1.50em";
        document.querySelector('.mediano').style.top = "62px";
        document.querySelector('.minimo').style.top = "62px";
    }
}
