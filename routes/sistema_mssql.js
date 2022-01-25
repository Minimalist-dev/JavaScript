const express   = require('express');
const router    = express.Router();
const mssql      = require('../s/sistema_mssql/backend');

/* GET pages. 
--------------------------------------------------------------------------------*/
router.get('/', function (req, res, next) {
    res.render('sistema_mssql', { title: 'Sistema SQL Server | Doc. JS | Neury'});
});

/* 
--------------------------------------------------------------------------------*/
router.post('/', mssql.insertar);
router.post('/pagina', mssql.paginacion);
router.post('/buscar', mssql.buscar);
router.get('/:id', mssql.obtener);
router.get('/editar/:id', mssql.editar);
router.get('/limite/:id', mssql.limite);
router.delete('/:id', mssql.eliminar);

module.exports = router;


