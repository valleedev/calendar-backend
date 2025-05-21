const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config')

//crear servidor express
const app = express();

//Base de datos
dbConnection()

//CORS
app.use(cors())

//Directorio Publico
app.use( express.static('public') )

//lectura y parseo del body
app.use( express.json() );


//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));






















const port = process.env.PORT
app.listen( port, () => {
    console.log("Servidor corriendo en http://localhost:"+port)
} )