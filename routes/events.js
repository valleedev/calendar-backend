const { Router} = require('express');
const { check } =  require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router()


router.use( validarJWT );

//Obtener evento
router.get(
    '/', 
    getEventos
);

//crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha Inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha Final es obligatorio').custom( isDate ),
        validarCampos
    ],
    crearEvento
);

//actualizar evento
router.put(
    '/:id', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha Inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha Final es obligatorio').custom( isDate ),
        validarCampos
    ],
    actualizarEvento
);

//Eliminar evento
router.delete('/:id', eliminarEvento);


module.exports = router;