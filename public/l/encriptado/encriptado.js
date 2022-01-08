let objeto;  

let req = document.querySelector('#encriptado');
let res = document.querySelector('#res');

/* Sistema JSON 
--------------------------------------------------------------------------------*/
class Sistema {
    static
    insertar() {
/* Encriptado 1:
--------------------------------------------------------------------------------*/
//        let infoEncriptado = window.btoa(document.forms['encriptado']['info'].value);
/* Encriptado 2:
--------------------------------------------------------------------------------*/
        let infoEncriptado = CryptoJS.AES.encrypt(document.forms['encriptado']['info'].value, 'contrasena').toString();

        fetch('/i/encriptado', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ info: infoEncriptado })
        }).then(function(response) {
            if(response.ok) { return response.text(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(texto) { console.log(texto);
/* descencriptado 1:
--------------------------------------------------------------------------------*/
//            res.innerHTML   = window.atob(texto);
/* descencriptado 2: desde el servidor
--------------------------------------------------------------------------------*/
            res.innerHTML   = texto;
            setTimeout(function() { res.innerHTML = ''; }, 4000);
            req.reset();
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
}

req.onsubmit = function(evento) {
    evento.preventDefault();
    Sistema.insertar();
};
