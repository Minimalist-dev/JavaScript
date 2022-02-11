class ClaseExportada {
    static campoEstaticoExportado = "campo estatico exportado";
    
    constructor(clase, exportada) {
        this.clase = clase;
        this.exportada = exportada;
    }
    static get clase()      { return this._clase;       }
    static set clase(x)     { this._clase = x;          }
    static get exportada()  { return this._exportada;   }
    static set exportada(x) { this._exportada = x;      }
    
    static
    metodoEstaticoExportado() { 
        return "metodo estatico exportado"; 
    }

    metodoInstanciaExtendido() { 
        return "metodo instancia extendido de exportación"; 
    }
    static
    metodoEstaticoExtendido() { 
        return "metodo estatico extendido de exportación"; 
    }
}

ClaseExportada.clase        = "clase";
ClaseExportada.exportada    = "exportada";

export default ClaseExportada;