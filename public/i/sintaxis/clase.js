//let clase = document.querySelector("#clase");

const PREFIJO = 'Prefijo';
    
class Clase {
    instancia;
    campoInstacia = "campo instacia";
    static estatico;
    static campoEstatico = "campo estatico";
    [`campo${PREFIJO}`] = "campo prefijo";
    static #CONSTANTE;
    static #CONSTANTE_PRIVADA = "metodo de constante privada";

    constructor(clase) {
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
}

class ClaseHereda extends Clase {
    metodoInstancido = super.metodoInstacia();

    metodoInstacia() {
        return super.metodoInstacia();
    }
};

let clase           = new Clase("clase");
let sintaxis        = new Clase();
let sintaxisHereda  = new ClaseHereda();

sintaxis.setAndGet      = "set and get";
Clase.setAndGetStatic   = "set and get static";

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

//console.log();
//console.log();
//console.log();
//console.log();
//console.log();
//console.log();
//console.log();
//console.log();

