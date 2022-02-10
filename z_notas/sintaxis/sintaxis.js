/* Clases: sintaxis
 *  https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes
 *  https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes/Public_class_fields
--------------------------------------------------------------------------------*/
let campo = document.querySelector('#campo');
    
    const PREFIX = 'prefix';
    
    class Clase {
        instancia = 'instance field';
        static estatico = 'static field';
        [`${PREFIX}Field`] = 'prefixed field';
        msg = 'hello world this';
        #privado = 'hello world';
        static #PRIVATE_STATIC_FIELD;
        #message;
        
        constructor() {
            this.#decoratedMessage = 'hello world';
            console.log(this.#decoratedMessage);
        }
        
        baseInstanceMethod() { 
            return 'super base method output'; 
        }
        //*generatorMethod() { }
        async asyncMethod() { 
            return 'async metodo';
        }
        //async *asyncGeneratorMethod() { }
        basePublicMethod() {
            return this.msg;
        }
        
        get privado() {
            return this.#privado;
        }
        set privado(x) {
            this.#privado = `hello ${x}`;
        }
        static publicStaticMethod() {
            Clase.#PRIVATE_STATIC_FIELD = 42;
            return Clase.#PRIVATE_STATIC_FIELD;
        }
        get #decoratedMessage() {
            return `✨${this.#message}✨`;
        }
        set #decoratedMessage(msg) {
            this.#message = msg;
        }

  
    }
    
    class ClaseSuper extends Clase {
        subInstanceField = super.baseInstanceMethod();
        
        subPublicMethod() {
            return super.basePublicMethod();
        }
    }
    
const init = new Clase();
const initSuper = new ClaseSuper();

console.log(inst.instancia);
console.log(Clase.estatico);
console.log(init.prefixField);
console.log(initSuper.subInstanceField);
console.log(init.asyncMethod());
console.log(initSuper.subPublicMethod());
console.log(init.privado);
// expected output: "hello worl​d"
init.privado = 'cake';
console.log(init.privado);
console.log(Clase.publicStaticMethod() === 42);
console.log(new Clase());


/*                                                               fin de ejemplo.
--------------------------------------------------------------------------------*/


var sintaxi = document.querySelector("button");

sintaxi.onclick = sintaxis;

function 
sintaxis() {
    console.log("Sintaxis");
    sintaxi.innerHTML = "Sintaxis";
}

class Campo {
    instanceField = 'instance field';
    static staticField = 'static field';
}
/* Clase Instancia 
--------------------------------------------------------------------------------*/
class Instancia {
    constructor(name) {
        this.name = name;
    }
    hola() {
        return "Hola Instancia";
    }
    hello(x) {
        return "Hello " + x.name + " : " + this.hola();
    }
}

let instancia = new Instancia("instant");
document.getElementById("demo").innerHTML = instancia.hello(instancia);

class Instancia2 {
    constructor() {
        const claseInstanciada = new Instancia();
    }
    hola2() {
        return "Hola Instancia2";
    }
    hello2(x) {
        return "Hello2 " + x.name + " : " + this.hola2();
    }
}

let instancia2 = new Instancia2("instant");
document.getElementById("demo").innerHTML = instancia2.hello();
/* Clase Estatica 
--------------------------------------------------------------------------------*/
class Estatico {
    constructor(name) {
        this.name = name;
    }
    static holaEstatico() {
        return "Hola Estatico";
    }
    static helloStatic(x) {
        return "Hello " + x.name + " : " + this.holaEstatico();
    }
}

let estatico = new Estatico("stitic");
document.getElementById("demo-static").innerHTML = Estatico.helloStatic(estatico);
/* Clase Heredada 
--------------------------------------------------------------------------------*/
class Car {
    constructor(brand) {
        this.carname = brand;
    }
    present() {
        return 'I have a ' + this.carname;
    }
}

class Model extends Car {
    constructor(brand, mod) {
        super(brand);
        this.model = mod;
    }
    show() {
        return this.present() + ', it is a ' + this.model;
    }
}

let myCar = new Model("Ford", "Mustang");
document.getElementById("demo2").innerHTML = myCar.show();
/* Clase captadores y definidores
--------------------------------------------------------------------------------*/
class SetAndGet {
    constructor(brand) {
        this.carname = brand;
    }
    get cnam() {
        return this.carname;
    }
    set cnam(x) {
        this.carname = x;
    }
//    get carname() {
//        return this._carname;
//    }
//    set carname(x) {
//        this._carname = x;
//    }
}

let captadoresAndDefinidores = new SetAndGet("Ford");

document.getElementById("demo").innerHTML = captadoresAndDefinidores.cnam;