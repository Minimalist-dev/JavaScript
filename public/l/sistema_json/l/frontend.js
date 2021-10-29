var objeto, intervalo, salida, maximo, identificador;  

let insertar      = document.querySelector("#insertar");
let consulta      = document.querySelector("#consulta");
let res           = document.querySelector("#res");
let buscar        = document.querySelector("#buscar");
let busqueda      = document.querySelector("#busqueda");
let cantidad      = document.querySelector("#cantidad");
let por           = document.querySelector("#por");
let ordenar       = document.querySelector("#ordenar");
let paginacion    = document.querySelector("#paginacion");
let paginaciones  = document.querySelector("#paginaciones");
let pagina        = document.querySelector("#pagina");
let startAndEnd   = document.querySelector("#inicia-y-termina");
let anterior      = document.querySelector("#anterior");
let siguiente     = document.querySelector("#siguiente");

var id      = document.querySelector("#id");
var marca   = document.querySelector("#marca");
var nombre  = document.querySelector("#nombre");
var precio  = document.querySelector("#precio");
var submit  = document.querySelector("#submit");

var concepto = [];

/* Sistema JSON 
--------------------------------------------------------------------------------*/
class Sistema {
    constructor(inicia, termina, entre) {
        this._inicia    = inicia;
        this._termina   = termina;
        this._entre     = entre;  
    }
    get inicia()            { return this._inicia;      }
    set inicia(inicia)      { this._inicia = inicia;    }
    get termina()           { return this._termina;     }
    set termina(termina)    { this._termina = termina;  }
    get entre()             { return this._entre;       }
    set entre(entre)        { this._entre = entre;      }
    
    static
    colocar() {
        fetch('s_db/l/sistema_json/db.json', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            objeto          = json.reverse(); 
            maximo          = json.length;
            Sistema.inicia  = 0;
            Sistema.termina = 4;
            Sistema.entre   = 4;
            
            Sistema.paginaciones(maximo, Sistema.entre);
            Sistema.longitud(Sistema.inicia, Sistema.termina);
            Sistema.obtener();
            Sistema.conceptos(json);
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static 
    obtener() {
        salida = '';

        for(let i in intervalo) {
            if(intervalo[i].eliminado === false) {
                let date      = new Date(intervalo[i].fecha);
                let opciones  = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

                salida += `
                    <tr>
                        <td>${intervalo[i].id}</td>
                        <td>${new Intl.DateTimeFormat('es').format(date)}</td>
                        <td>${new Intl.DateTimeFormat('es', opciones).format(date)}</td>
                        <td>${intervalo[i].marca}</td>
                        <td>${intervalo[i].nombre}</td>
                        <td>${intervalo[i].precio}</td>
                        <td>
                            <button type='submit' onclick="Sistema.actualizar(${intervalo[i].id})">Editar</button>
                        </td> 
                        <td>
                            <button type='button' onclick="Sistema.eliminar(${intervalo[i].id})">Eliminar</button>
                        </td>  
                    </tr>
                `;  
            } else {
                salida += `
                    <tr><td>${intervalo[i].id}</td><td>-</td><td>-</td><td>-</td><td>-</td>
                    <td>-</td><td><button>-</button></td><td><button>-</button></td></tr>
                `;
            }
        }

        if(salida !== '') {
            consulta.innerHTML = salida;
        } else {
            consulta.innerHTML = `
                <tr>
                    <td colspan='8' style='text-align: center;padding: 16px 0px;'>
                        No ha resultados...
                    </td>
                </tr>
            `;
        }
    }
    static
    conceptos(conceptos) {
        for(let i in conceptos) {
            concepto.push(conceptos[i].marca);
            concepto.push(conceptos[i].nombre);
        }
    }
    static
    busqueda() {
        salida = '';

        let valor = buscar.value;

        for(let i in objeto) {
            if(valor === '') {
                Sistema.obtener();
            } else if(
//                objeto[i].id        === valor ||
                objeto[i].nombre    === valor ||
                objeto[i].marca     === valor ||
                objeto[i].precio    === Number(valor)
            ) { 
                Sistema.obtenerBusqueda(objeto[i]); 
            } 
        }
        
        if(salida !== '') {
            consulta.innerHTML = salida;
        } else {
            consulta.innerHTML = `
                <tr>
                    <td colspan='8' style='text-align: center;padding: 16px 0px;'>
                        No ha resultados...
                    </td>
                </tr>
            `;
        }
    }
    static
    obtenerBusqueda(objeto) {
        let date      = new Date(objeto.fecha);
        let opciones  = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

        salida += `
            <tr>
                <td>${objeto.id}</td>
                <td>${new Intl.DateTimeFormat('es').format(date)}</td>
                <td>${new Intl.DateTimeFormat('es', opciones).format(date)}</td>
                <td>${objeto.marca}</td>
                <td>${objeto.nombre}</td>
                <td>${objeto.precio}</td>
                <td>
                    <button type='submit' onclick="Sistema.actualizar(${objeto.id})">Editar</button>
                </td> 
                <td>
                    <button type='button' onclick="Sistema.eliminar(${objeto.id})">Eliminar</button>
                </td>  
            </tr>
        `;   
    }
    static
    autocompletar(entrada, arreglo) {
        /*the autocomplete function takes two arguments,
         the text field element and an array of possible autocompleted values:*/
        var enfoque;
        /*execute a function when someone writes in the text field:*/
        entrada.addEventListener('input', function () {
            var a, b, i, concepto = this.value;
            /*close any already open lists of autocompleted values*/
            cerrarLista();
            
            if (!concepto) {
                return false;
            }
            enfoque = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement('div');
            a.setAttribute('id', this.id + 'lista');
            a.setAttribute('class', 'elementos');
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arreglo.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arreglo[i].substr(0, concepto.length).toUpperCase() === concepto.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("div");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arreglo[i].substr(0, concepto.length) + "</strong>";
                    b.innerHTML += arreglo[i].substr(concepto.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arreglo[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener('click', function (e) {
                        /*insert the value for the autocomplete text field:*/
                        entrada.value = this.getElementsByTagName('input')[0].value;
                        /*close the list of autocompleted values,
                         (or any other open lists of autocompleted values:*/
                        cerrarLista();
                    });
                    a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        entrada.addEventListener('keydown', function (evento) {
            var tecla = document.getElementById(this.id + 'lista');
            
            if (tecla) {
                tecla = tecla.getElementsByTagName('div');
            }
            
            if (evento.keyCode === 40) {
                /*If the arrow DOWN key is pressed,
                 increase the currentFocus variable:*/
                enfoque++;
                /*and and make the current item more visible:*/
                agregarActivo(tecla);
            } else if (evento.keyCode === 38) { //up
                /*If the arrow UP key is pressed,
                 decrease the currentFocus variable:*/
                enfoque--;
                /*and and make the current item more visible:*/
                agregarActivo(tecla);
            } else if (evento.keyCode === 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                evento.preventDefault();
                
                if (enfoque > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (tecla)
                        tecla[enfoque].click();
                }
            }
        });
        function 
        agregarActivo(actual) {
            /*a function to classify an item as "active":*/
            if (!actual)
                return false;
            /*start by removing the "active" class on all items:*/
            eliminarActivo(actual);
            
            if (enfoque >= actual.length)
                enfoque = 0;
            if (enfoque < 0)
                enfoque = (actual.length - 1);
            /*add class "autocomplete-active":*/
            actual[enfoque].classList.add('activo');
        }
        function 
        eliminarActivo(actual) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (let i = 0; i < actual.length; i++) {
                actual[i].classList.remove('activo');
            }
        }
        function 
        cerrarLista(elemento) {
            /*close all autocomplete lists in the document,
             except the one passed as an argument:*/
            var elementos = document.getElementsByClassName('elementos');
            
            for (var i = 0; i < elementos.length; i++) {
                if (elemento !== elementos[i] && elemento !== entrada) {
                    elementos[i].parentNode.removeChild(elementos[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener('click', function (evento) {
            cerrarLista(evento.target);
            Sistema.busqueda();
        });
    }
    static
    insertar() {
        let id = document.forms['insertar']['id'].value;
        
        id === '' ? identificador = objeto.length + 1 : identificador = id;
        
        let datos = JSON.stringify({
            id:     identificador.toString(),
            marca:  document.forms['insertar']['marca'].value,
            nombre: document.forms['insertar']['nombre'].value,
            precio: Number(document.forms['insertar']['precio'].value),
            submit: document.forms['insertar']['submit'].value
        });
        
        fetch('/sistema_JSON', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            objeto          = json.reverse();
            submit.value    = 'Crear';
            res.innerHTML   = 'Insertado con exito.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);
            insertar.reset();

            Sistema.paginaciones(maximo, Sistema.entre);
            Sistema.longitud(Sistema.inicia, Sistema.termina);
            Sistema.obtener();
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    actualizar(actualizar) {
        fetch('/sistema_JSON/' + actualizar, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function (json) {
            res.innerHTML = 'Listo para actualizar.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);
            
            id.value        = json.id;
            marca.value     = json.marca;
            nombre.value    = json.nombre;
            precio.value    = json.precio;
            submit.value    = 'Actualizar'; 
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    eliminar(eliminar) {
        fetch('/sistema_JSON/' + eliminar, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            objeto          = json.reverse(); 
            res.innerHTML   = 'Eliminado con exito.';
            setTimeout(function() { res.innerHTML = ''; }, 4000);

            Sistema.paginaciones(maximo, Sistema.entre);
            Sistema.longitud(Sistema.inicia, Sistema.termina);
            Sistema.obtener();
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    cantidad() {  
        paginacion.reset();

        Sistema.inicia  = 0;
        Sistema.termina = Number(cantidad.value);
        Sistema.entre   = Number(cantidad.value);

        Sistema.paginacion();
        Sistema.paginaciones(maximo, Sistema.entre);
        Sistema.longitud(Sistema.inicia, Sistema.termina);
        Sistema.obtener();
    }
    static
    ordenarPor() {
        if(por.value === 'id') {
            objeto.sort(function(a, b) { return a.id - b.id; });
        } else if(por.value === 'fecha') {
            objeto.sort(function (a, b) {
                var x = a.fecha.toLowerCase();
                var y = b.fecha.toLowerCase();

                if (x < y) { return -1; }
                if (x > y) { return 1; }

                return 0;
            });
        } else if (por.value === 'marca') {
            objeto.sort(function (a, b) {
                var x = a.marca.toLowerCase();
                var y = b.marca.toLowerCase();

                if (x < y) { return -1; }
                if (x > y) { return 1; }

                return 0;
            });
        } else if (por.value === 'nombre') {
            objeto.sort(function (a, b) {
                var x = a.nombre.toLowerCase();
                var y = b.nombre.toLowerCase();

                if (x < y) { return -1; }
                if (x > y) { return 1; }

                return 0;
            });
        } else if(por.value === 'precio') {
            objeto.sort(function(a, b) { return a.precio - b.precio; });
        }
        
        Sistema.paginaciones(maximo, Sistema.entre);
        Sistema.longitud(Sistema.inicia, Sistema.termina);
        Sistema.obtener();
    }
    static
    ordenar() {
        objeto.reverse();
        
        Sistema.paginaciones(maximo, Sistema.entre);
        Sistema.longitud(Sistema.inicia, Sistema.termina);
        Sistema.obtener();

        ordenar.innerHTML === 'Ascendente' ? ordenar.innerHTML = 'Descendente' : ordenar.innerHTML = 'Ascendente';
    }
    static
    paginacion() {
        let valor = Number(startAndEnd.value);
        
        if(valor <= 0) { 
            anterior.style.visibility =  'hidden'; 
            siguiente.style.visibility = 'visible';
        } else if(valor + Sistema.entre >= maximo) { 
            anterior.style.visibility = 'visible';
            siguiente.style.visibility = 'hidden';
        } else {
            anterior.style.visibility = 'visible';
            siguiente.style.visibility = 'visible';
        }
        
        Sistema.paginaciones(maximo, Sistema.entre);
        Sistema.longitud(valor, valor + Sistema.entre);
        Sistema.obtener();
    }
    static
    longitud(inicia, termina) {
        intervalo = objeto.slice(inicia, termina);
    }
    static
    paginaciones(total, intervalo) {
        let paginas = Math.ceil(total / intervalo);

        paginaciones.innerHTML = pagina.value + " / " + paginas;
        
        /* funciona
        page.innerHTML = '';
        for(let i = 0; i < paginas; i++) {
            let span = document.createElement('span');var pag = i + 1;span.innerHTML = pag + ' /';page.appendChild(span);
        }
        */
    }
}
Sistema.colocar();

insertar.onsubmit = function(evento) {
    evento.preventDefault();
    Sistema.insertar();
};

/* Complementos
--------------------------------------------------------------------------------*/

/* Complementos: Busqueda...
--------------------------------------------------------------------------------*/
buscar.oninput = function() {
    Sistema.busqueda();
};
busqueda.onsubmit = function(evento) {
    evento.preventDefault();
    Sistema.busqueda();
};

Sistema.autocompletar(buscar, concepto);

/* Complementos: Cantidad
--------------------------------------------------------------------------------*/
cantidad.oninput = function() {
    Sistema.cantidad();
};

/* Complementos: Ordenar por
--------------------------------------------------------------------------------*/
por.oninput = function() {
    Sistema.ordenarPor();
};

/* Complementos: Ordenar
--------------------------------------------------------------------------------*/
ordenar.onclick = function(evento)  {
    Sistema.ordenar();
};

/* Complementos: Paginación
--------------------------------------------------------------------------------*/
anterior.onclick = function () {
    startAndEnd.stepDown(Sistema.entre);  
    pagina.stepDown(1);
    Sistema.paginacion();
};
siguiente.onclick = function () {
    startAndEnd.stepUp(Sistema.entre); 
    pagina.stepUp(1);
    Sistema.paginacion();
};


