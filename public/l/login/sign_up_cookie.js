let out = document.querySelector('#sign_out');

class Login {
    static 
    signIn() {
        fetch('/log_cookie/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: sessionStorage.getItem("id") })
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) { console.log(json);
            document.querySelector('#id').innerHTML = json.id;
            document.querySelector('#correo').innerHTML = json.correo;
            document.querySelector('#fecha').innerHTML = json.fecha;
        }).catch(function(error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static
    signOut() {
        fetch('/log_cookie/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: sessionStorage.getItem("id") })
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            if(json.res === null) { 
                window.location = '/log_cookie'; 
            }
        }).catch(function(error) {
            console.log('Error de captura: ' + error.message);
        });
    }
}

/* Disparadores
--------------------------------------------------------------------------------*/
window.onload = function(evento) {
    evento.preventDefault();
    Login.signIn();
};
out.onclick = function(evento) {
    evento.preventDefault();
    Login.signOut();
};