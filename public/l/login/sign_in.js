let out = document.querySelector('#sign_out');

class Login {
    static 
    signIn() {
        fetch('/logup/sesion', {
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
        sessionStorage.clear();
        window.history.back();
    }
}

/* Disparadores
--------------------------------------------------------------------------------*/
window.onload = function(evento) {
    evento.preventDefault();
    Login.signIn();
};
out.onclick = function(evento) {
    Login.signOut();
};