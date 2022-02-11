//var res =  require('../clase_api_servidor.js');
//var res =  require('../../clase_api_servidor.js');
//var res =  require('../../../clase_api_servidor.js');
//res.metodoRetornar();
 
class ApiExportada {
    static
    metodoEstatico() { 
        import('./export/clase_api_exportada.js').then(function(API) {
            let apiExportada = new API.ApiExportada("clase_api");
            apiExportada.constructor;
            apiExportada.metodoApiInstancia();
            API.ApiExportada.metodoApiEstatico("clase_api");
            apiExportada.metodoApiArray();
            console.log(apiExportada.metodoRetornar());
        }); 
    }
}

ApiExportada.metodoEstatico();

//import('../clase_api_servidor.js').then(function(API) {
//import('../../clase_api_servidor.js').then(function(API) {
import('../../../clase_api_servidor.js').then(function(API) {
    console.log(API);
    let apiServidor = new API.ApiServidor();
    apiServidor.metodoRetornar()
    console.log(apiServidor.metodoRetornar());
});

