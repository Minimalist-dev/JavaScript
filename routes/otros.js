let express       = require('express');
let session       = require('express-session');
let router        = express.Router();


/* archivo Authenticated
--------------------------------------------------------------------------------*/
const {promisify} = require('util')

exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

/* Authenticated en router
--------------------------------------------------------------------------------*/
const authController = require('../controllers/authController')
//router para las vistas
router.get('/', authController.isAuthenticated, (req, res)=>{    
    res.render('index', {user:req.user})
})

module.exports = router;

/* archivo conexion
--------------------------------------------------------------------------------*/
//Para eliminar la cache 
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

/* archivo conexion
--------------------------------------------------------------------------------*/
//const mysql = require('mysql')
//
//const conexion = mysql.createConnection({
//    host : process.env.DB_HOST,
//    user : process.env.DB_USER,
//    password : process.env.DB_PASS,
//    database : process.env.DB_DATABASE,
//})
//
//conexion.connect( (error)=> {
//    if(error){
//        console.log('El error de conexión es: '+error)
//        return
//    }
//    console.log('¡Conectado a la base de datos MySQL!')
//})
//
//module.exports = conexion
