// Get the id of the <path> element and the length of <path>
var rectangulo  = document.getElementById("rect");
var circulo     = document.getElementById("circle");
var linea       = document.getElementById("line");
var ellipse     = document.getElementById("ellipse2");
var poligono    = document.getElementById("polygon");
var polilinea   = document.getElementById("polyline");
var camino      = document.getElementById("path");
//var texto       = document.querySelector("#text");

var longitud1 = rectangulo.getTotalLength();
var longitud2 = circulo.getTotalLength();
var longitud3 = linea.getTotalLength();
var longitud4 = ellipse.getTotalLength();
var longitud5 = poligono.getTotalLength();
var longitud6 = polilinea.getTotalLength();
var longitud7 = camino.getTotalLength();
//var longitud8 = texto.getTotalLength();
//console.log("L 1: ");
//console.log(longitud1);
//console.log("L 2: ");
//console.log(longitud2);
//console.log("L 3: ");
//console.log(longitud3);
//console.log("L 4: ");
//console.log(longitud4);
//console.log("L 5: ");
//console.log(longitud5);
//console.log("L 6: ");
//console.log(longitud6);
//console.log("L 7: ");
//console.log(longitud7);
// The start position of the dibujaring
rectangulo.style.strokeDasharray    = longitud1;
circulo.style.strokeDasharray       = longitud2;
linea.style.strokeDasharray         = longitud3;
ellipse.style.strokeDasharray       = longitud4;
poligono.style.strokeDasharray      = longitud5;
polilinea.style.strokeDasharray     = longitud6;
camino.style.strokeDasharray        = longitud7;
//texto.style.strokeDasharray         = longitud8;

// Hide the rectangulo by offsetting dash. Remove this line to show the rectangulo before scroll dibujar
rectangulo.style.strokeDashoffset   = longitud1;
circulo.style.strokeDashoffset      = longitud2;
linea.style.strokeDashoffset        = longitud3;
ellipse.style.strokeDashoffset      = longitud4;
poligono.style.strokeDashoffset     = longitud5;
polilinea.style.strokeDashoffset    = longitud6;
camino.style.strokeDashoffset       = longitud7;
//texto.style.strokeDashoffset        = longitud8;

// Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled
window.addEventListener("scroll", graficos);

function 
graficos() {
    var porcentaje = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    var porcentaje2 = document.documentElement.scrollTop / 2.51;
    
    var dibujar1    = longitud1 * porcentaje;
    var dibujar2    = porcentaje2;
    var dibujar3    = longitud3 * porcentaje;
    var dibujar4    = longitud4 * porcentaje;
    var dibujar5    = longitud5 * porcentaje;
    var dibujar6    = longitud6 * porcentaje;
    var dibujar7    = longitud7 * porcentaje;
//    var dibujar8    = longitud8 * porcentaje;
  
    // Reverse the dibujando (when scrolling upwards)
    rectangulo.style.strokeDashoffset   = longitud1 - dibujar1;
    circulo.style.strokeDashoffset      = longitud2 - dibujar2;
    linea.style.strokeDashoffset        = longitud3 - dibujar3;
    ellipse.style.strokeDashoffset      = longitud4 - dibujar4;
    poligono.style.strokeDashoffset     = longitud5 - dibujar5;
    polilinea.style.strokeDashoffset    = longitud6 - dibujar6;
    camino.style.strokeDashoffset       = longitud7 - dibujar7;
//    texto.style.strokeDashoffset        = longitud8 - dibujar8;
}
