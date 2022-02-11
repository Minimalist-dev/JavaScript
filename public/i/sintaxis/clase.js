//let clase = document.querySelector("#clase");

const PREFIJO = 'Prefijo';
    
class Clase {
    instancia;
    campoInstacia = "campo instacia";
    static estatico;
    static campoEstatico = "campo estatico";
//    #campoPrivado = "campo privado";
    [`campo${PREFIJO}`] = "campo prefijo";
////    #privado = 'hello world';
//    static #PRIVATE_STATIC_FIELD;
//
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
        return "Metodo instacia"; 
    }
    static
    metodoEstatico() { 
        return "Metodo estatico"; 
    }
//    //*generatorMethod() { }
//    async asyncMethod() { 
//        return 'async metodo';
//    }
//    //async *asyncGeneratorMethod() { }
//    basePublicMethod() {
//        return this.msg;
//    }

//    get privado() {
//        return this.#campoPrivado;
//    }
//    set privado(x) {
//        this.#campoPrivado = `hello ${x}`;
//    }
//    static publicStaticMethod() {
//        Clase.#PRIVATE_STATIC_FIELD = 42;
//        return Clase.#PRIVATE_STATIC_FIELD;
//    }
//    get #decoratedMessage() {
//        return `✨${this.#message}✨`;
//    }
//    set #decoratedMessage(msg) {
//        this.#message = msg;
//    }


}

//class ClaseSuper extends Clase {
////    subInstanceField = super.metodoInstacia();
//
//    subPublicMethod() {
//        return super.basePublicMethod();
//    }
//};
    
//const init = new Clase();
//const initSuper = new ClaseSuper();
let clase = new Clase("Clase");
let sintaxis = new Clase("Clase");

sintaxis.setAndGet = "Set and Get";
Clase.setAndGetStatic = "Set and Get Static";

document.querySelector("#clase").innerHTML              = clase.clase;
document.querySelector("#campo_instacia").innerHTML     = sintaxis.campoInstacia;
document.querySelector("#campo_estatico").innerHTML     = Clase.campoEstatico;
document.querySelector("#campo_prefijo").innerHTML      = sintaxis.campoPrefijo;
document.querySelector("#metodo_instacia").innerHTML    = sintaxis.metodoInstacia();
document.querySelector("#metodo_estatico").innerHTML    = Clase.metodoEstatico();
document.querySelector("#set_and_get").innerHTML        = sintaxis.setAndGet;
document.querySelector("#set_and_get_static").innerHTML = Clase.setAndGetStatic;

//sintaxis.privado("Hello")
//console.log(sintaxis.privado);
//console.log(initSuper.subInstanceField);
//console.log(init.asyncMethod());
//console.log(initSuper.subPublicMethod());
//console.log(init.privado);
//// expected output: "hello worl​d"
//init.privado = 'cake';
//console.log(init.privado);
//console.log(Clase.publicStaticMethod() === 42);
//console.log(new Clase());

