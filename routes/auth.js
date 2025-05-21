const express = require('express');
const { check,  } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')

const router = express.Router()


router.post(
    '/new',
    [ //middleware
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 carácteres').isLength( {min: 6}),
        validarCampos
    ] ,
    crearUsuario
);

router.post(
    '/',
    [//middleware
        check('email', 'El email debe ser un email valido').isEmail(),
        check('password', 'El password debe tener al menos 6 letras').isLength( {min: 6}),
        validarCampos
    ],
    loginUsuario
);


router.get('/renew', validarJWT, revalidarToken);

module.exports = router;