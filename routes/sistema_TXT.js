const express   = require('express');
const router    = express.Router();
const ruta      = require('../s/sistema_txt/l/backend');

/* GET pages. 
--------------------------------------------------------------------------------*/
//router.get('/', function (req, res, next) {
//    res.render('sistema_TXT', { title: 'Sistema JSON: CRUD mas complementos | Neury'});
//});

/* Sistema JSON 
--------------------------------------------------------------------------------*/

/* CRUD: Create, Read, Update, Delete.
--------------------------------------------------------------------------------*/
router.post('/', ruta.insertar);
router.delete('/:id', ruta.eliminar);
router.get('/:id', ruta.obtener);

module.exports = router;
