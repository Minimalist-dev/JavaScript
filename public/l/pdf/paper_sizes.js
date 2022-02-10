/* SIZES 
--------------------------------------------------------------------------------*/
const SIZES = [
    "A0",
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
    "B0",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
    "C0",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "RA0",
    "RA1",
    "RA2",
    "RA3",
    "RA4",
    "SRA0",
    "SRA1",
    "SRA2",
    "SRA3",
    "SRA4",
    "EXECUTIVE",
    "LEGAL",
    "LETTER",
    "TABLOID",
    "4a0",
    "2A0",
    "FOLIO"
];

let medida      = document.querySelector('#size');
let formato     = document.querySelector('#formato');
let medidas     = document.querySelector('#sizes');
let generar     = document.querySelector('#generar');
let abrir       = document.querySelector('#abrir');
let descargar   = document.querySelector('#descargar');

class Size {
    static
    existentes() {
        for (let i = 0; i < SIZES.length; i++) {
            sizes.options[sizes.options.length] = new Option(SIZES[i], SIZES[i]);
        }
    }
    static
    escoger() {        
        fetch('/i/pdf/paper_sizes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                formato: formato.value,
                medida: medidas.value 
            })
        }).then(function(response) {
            if(response.ok) { return response.text(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) { console.log(json);
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
}

/* Disparadores
--------------------------------------------------------------------------------*/
window.onload = function() { Size.existentes(); };

medida.onsubmit = function(evento) {
    evento.preventDefault();
    Size.escoger();
};
medidas.oninput = function() {
    generar.disabled = false;
    generar.innerHTML = `<a href="/i/pdf/paper_sizes/${medidas.value}">Generar: ${medidas.value}</a>`;
    abrir.dissabled = false;
    abrir.innerHTML = `<a href="/s_db/l/pdf/generar_${medidas.value}.pdf" target="_blank">Abrir: ${medidas.value}</a>`;
    descargar.disabled = false;
    descargar.innerHTML = `<a href="/s_db/l/pdf/generar_${medidas.value}.pdf" download="">Descargar: ${medidas.value}</a>`;
};
