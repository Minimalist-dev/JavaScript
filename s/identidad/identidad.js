var os      = require('os');
var objeto  = {};

objeto.identidad = (req, res) => {
    var usuario = os.userInfo();
    
    res.render('identidad', { 
        title: 'Identidad del dispositivo | Neury', 
        Objeto: [{
            "cpu":          os.cpus(), 
            "plataforma":   os.platform(), 
            "tipo":         os.type(),
            "version":      os.version(),
            "pc":           os.hostname(),
            "usuario":      usuario.username
        }]
    });
//    console.log(usuario);
//    console.log(res);
};

module.exports = objeto;

