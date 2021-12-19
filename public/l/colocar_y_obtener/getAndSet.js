class Yo {
    constructor(id, nombre, apellido, correo, numero, sexo, nacimiento, pais, foto, portada, estado) {
        this._id            = id;
        this._nombre        = nombre;
        this._apellido      = apellido;
        this._correo        = correo;
        this._numero        = numero;
        this._sexo          = sexo;
        this._nacimiento    = nacimiento;
        this._pais          = pais;
        this._foto          = foto;
        this._portada       = portada;
        this._estado        = estado;
    }
    get id()                    { return this._id;                  } 
    set id(id)                  { this._id = id;                    }
    get nombre()                { return this._nombre;              }
    set nombre(nombre)          { this._nombre = nombre;            }
    get apellido()              { return this._apellido;            }
    set apellido(apellido)      { this._apellido = apellido;        }
    get correo()                { return this._correo;              } 
    set correo(correo)          { this._correo = correo;            }
    get numero()                { return this._numero;              } 
    set numero(numero)          { this._numero = numero;            }
    get sexo()                  { return this._sexo;                } 
    set sexo(sexo)              { this._sexo = sexo;                }
    get nacimiento()            { return this._nacimiento;          } 
    set nacimiento(nacimiento)  { this._nacimiento = nacimiento;    }
    get pais()                  { return this._pais;                } 
    set pais(pais)              { this._pais = pais;                }
    get foto()                  { return this._foto;                } 
    set foto(foto)              { this._foto = foto;                }
    get portada()               { return this._portada;             } 
    set portada(portada)        { this._portada = portada;          }
    get estado()                { return this._estado;              } 
    set estado(estado)          { this._estado = estado;            }
}
console.log(Yo.id);
console.log(Yo._id);
console.log(Yo.nombre);
console.log(Yo._nombre);
console.log(Yo.apellido);
console.log(Yo._apellido);

//let sesion = new Yo(
//    json[0].id, 
//    json[0].nombre, 
//    json[0].apellido, 
//    json[0].correo, 
//    json[0].numero, 
//    json[0].sexo, 
//    json[0].nacimiento, 
//    json[0].pais, 
//    json[0].foto, 
//    json[0].portada, 
//    json[0].estado
//);
//
//Yo.id           = json[0].id
//Yo.nombre       = json[0].nombre;
//Yo.apellido     = json[0].apellido
//Yo.correo       = json[0].correo;
//Yo.numero       = json[0].numero;
//Yo.sexo         = json[0].sexo;
//Yo.nacimiento   = json[0].nacimiento;
//Yo.pais         = json[0].pais;
//Yo.foto         = json[0].foto;
//Yo.portada      = json[0].portada;
//Yo.estado       = json[0].estado;
