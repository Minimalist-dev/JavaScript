let mensaje = document.querySelector('#mensaje');
let send    = document.querySelector('#enviar');
let res     = document.querySelector('#res');

class Email {
    static
    enviar() {
        let datos = JSON.stringify({
            mensaje: mensaje.contentWindow.document.body.innerHTML
        });
        
        fetch('/i/email/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function(response) {
            if(response.ok) { return response.text(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(text) {
            res.innerHTML = text;
            setTimeout(function() { res.innerHTML = ''; }, 10000);
        }).catch(function (error) {
            console.log('Error de captura: ' + error.message);
        });
    }
}
send.onclick = function() { 
    Email.enviar();
};
