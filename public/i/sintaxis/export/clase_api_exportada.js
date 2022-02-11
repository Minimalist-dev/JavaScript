class ApiExportada {
    constructor(listId) {
        this.listId = listId;
    }

    metodoApiInstancia() { 
        let list = document.querySelector("#" + this.listId);
        let listItem = document.createElement("li");
        
        listItem.textContent = "metodo api instancia";
        list.appendChild(listItem);
    }
    static
    metodoApiEstatico(id) { 
        let list = document.querySelector("#" + id);
        let listItem = document.createElement("li");
        
        listItem.textContent = "metodo api estatico";
        list.appendChild(listItem);
    }
    metodoApiArray() {
        let list = document.querySelector("#" + this.listId);
        let listar = ["uno", "dos", "tres"]; 
        
        for(let i = 0; i < listar.length; i++) {
            var listItem = document.createElement("li");
            
            listItem.textContent = listar[i];
            list.appendChild(listItem);
        }
    }
    metodoRetornar() {
        let lista = ["uno", "dos", "tres"];
        return lista;
    }
}


export { ApiExportada };