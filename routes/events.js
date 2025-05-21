

//Validar todo con JWT
//Obtener evento
router.get('/', getEventos );

//crear un nuevo evento
router.post('/', crearEvento);

//actualizar evento
router.put('/:id', actualizarEvento);

//Eliminar evento
router.delete('/:id', eliminarEvento);