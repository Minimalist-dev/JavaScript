import ClaseExportada from './export/clase_exportada.js';

const PREFIJO = 'Prefijo';
/* clase
--------------------------------------------------------------------------------*/
class Clase extends ClaseExportada {
    instancia;
    campoInstacia = "campo instacia";
    static estatico;
    static campoEstatico = "campo estatico";
    [`campo${PREFIJO}`] = "campo prefijo";
    static #CONSTANTE;
    static #CONSTANTE_PRIVADA = "metodo de constante privada";
    
    constructor(clase) {
        super();
//        super(clase);//ejecutado para evitar error por la clase extendendida
        this.clase = clase;
    }
    get setAndGet() {
        return this._setAndGet;
    }
    set setAndGet(x) {
        this._setAndGet = x;
    }
    static get setAndGetStatic() {
        return this._setAndGetStatic;
    }
    static set setAndGetStatic(x) {
        this._setAndGetStatic = x;
    }
    metodoInstacia() { 
        return "metodo instacia"; 
    }
    static
    metodoEstatico() { 
        return "metodo estatico"; 
    }
    static metodoConstantePrivada() {
        return Clase.#CONSTANTE_PRIVADA;
    }
    metodoInstanciaImportado() {
        return super.metodoInstanciaExtendido();//return this.metodoInstanciaExtendido();
    }
    static
    metodoEstaticoImportado() {
        return super.metodoEstaticoExtendido();//return this.metodoEstaticoExtendido();
    }
}

/* heredar de otra clase
--------------------------------------------------------------------------------*/
class ClaseHereda extends Clase {
    metodoInstancido = super.metodoInstacia();

    metodoInstacia() {
        return super.metodoInstacia();
    }
};

/* extención de clase JavaScript
--------------------------------------------------------------------------------*/
class ExtensionJS extends Array {
    constructor() {
        super();
    }

    apellido() {
        return this[this.length - 1];
    }
    
    nombreCompleto() {
        return this[0] + " " + this[1];
    }
}

/* instanciar clases
--------------------------------------------------------------------------------*/

let clase           = new Clase("clase");
let sintaxis        = new Clase();
let sintaxisHereda  = new ClaseHereda();
let extensionJS     = new ExtensionJS();

/* ejecutar...
--------------------------------------------------------------------------------*/
sintaxis.setAndGet          = "set and get";
Clase.setAndGetStatic       = "set and get static";

extensionJS.push('hello');
extensionJS.push('world');

document.querySelector("#clase").innerHTML              = clase.clase;
document.querySelector("#campo_instacia").innerHTML     = sintaxis.campoInstacia;
document.querySelector("#campo_estatico").innerHTML     = Clase.campoEstatico;
document.querySelector("#campo_prefijo").innerHTML      = sintaxis.campoPrefijo;
document.querySelector("#metodo_instacia").innerHTML    = sintaxis.metodoInstacia();
document.querySelector("#metodo_estatico").innerHTML    = Clase.metodoEstatico();
document.querySelector("#set_and_get").innerHTML        = sintaxis.setAndGet;
document.querySelector("#set_and_get_static").innerHTML = Clase.setAndGetStatic;
document.querySelector("#metodo_instanciado").innerHTML = sintaxisHereda.metodoInstancido + " : heredado por campo";
document.querySelector("#metodo_instanciado_metodo").innerHTML = sintaxisHereda.metodoInstacia() + " : heredado por metodo";
document.querySelector("#metodo_constante_privada").innerHTML = Clase.metodoConstantePrivada();
document.querySelector("#clase_exportada").innerHTML = ClaseExportada.clase + " " + ClaseExportada.exportada;
ClaseExportada.exportada = "importada";
document.querySelector("#clase_importada").innerHTML = ClaseExportada.clase + " " + ClaseExportada.exportada;
document.querySelector("#campo_estatico_exportado").innerHTML = ClaseExportada.campoEstaticoExportado;
document.querySelector("#metodo_estatico_exportado").innerHTML = ClaseExportada.metodoEstaticoExportado();
document.querySelector("#metodo_instancia_extendido_de_exportacion").innerHTML = sintaxis.metodoInstanciaImportado();
document.querySelector("#metodo_estatico_extendido_de_exportacion").innerHTML = Clase.metodoEstaticoImportado();
document.querySelector("#clase_extendido_de_js").innerHTML = extensionJS.length + " : " + extensionJS.apellido() + " : " + extensionJS.nombreCompleto() + " : clase (Array) extendida de JavaScript";