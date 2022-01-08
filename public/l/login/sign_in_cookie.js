let inReq   = document.querySelector('#in');
let upReq   = document.querySelector('#up');
let res     = document.querySelector('#res');

let inCorreo    = document.querySelector('#correo');
let inCodigo    = document.querySelector('#codigo');
let upCorreo    = document.querySelector('#correo_up');
let upCodigo    = document.querySelector('#codigo_up');

class Login {
    static 
    signIn() {
        let datos = JSON.stringify({ correo: inCorreo.value, codigo: inCodigo.value });

        fetch('/log_cookie/in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) { console.log(json);
            sessionStorage.clear();
            
            if(json.res.length === 7) {
                sessionStorage.setItem("id", json.id);
                
                res.innerHTML = json.res;
                
                setTimeout(function() { 
                    res.innerHTML = 'Login'; 
                    window.location = '/sesion_cookie';
                }, 6000);
            } else {
                res.innerHTML = json.res;
                setTimeout(function() { res.innerHTML = 'Login'; }, 4000);
            }
            
            inReq.reset();
        }).catch(function(error) {
            console.log('Error de captura: ' + error.message);
        });
    }
    static 
    signUp() {
        let datos = JSON.stringify({ correo: upCorreo.value, codigo: upCodigo.value });

        fetch('/log_cookie/up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: datos
        }).then(function(response) {
            if(response.ok) { return response.json(); } 
            else { throw 'Error de URL o respuesta.'; }
        }).then(function(json) {
            if(json.res.length === 22) {
                res.innerHTML = json.res;
                setTimeout(function() { res.innerHTML = 'Login'; }, 4000);
                upReq.reset();
            } else {
                res.innerHTML = json.res;
                setTimeout(function() { res.innerHTML = 'Login'; }, 4000);
            }
        }).catch(function(error) {
            console.log('Error de captura: ' + error.message);
        });
    }
}

/* Disparadores
--------------------------------------------------------------------------------*/
inReq.onsubmit = function(evento) {
    evento.preventDefault();
    Login.signIn();
};

upReq.onsubmit = function(evento) {
    evento.preventDefault();
    Login.signUp();
};


