require('dotenv').config()
// importamos express que es el framework para poder crear el servidor y manekjar las rutas de la api. 
const express = require('express')
// agrego cors para manejar los permisos de acceso
const cors = require('cors')
// creamos la instancia de la aplicacion express (lo ejecutamos) para poder usar sus distintos metodos y funcionalidades
const app = express()

// le doy permiso a localhost para desarrollo, en prod cambiar al url del host del front
app.use(cors({
  origin: 'http://localhost'
}))
// este es un middkeware global , que le dice a express que todos los requests que nos lleguen van a ser json
// entonces exppres automaticamente parsea el body de los req y los convierto a objet js para q podamos trabajar
app.use(express.json())

const routes = require('./routes/index')
// importamos las rutas de la api,  todas van a etsar bajo el prefijo /api
app.use('/api', routes)
// arrancamos el servidor en el puerto 3000, va a quedar escuchando los requests entrantes
const PORT = process.env.BACKEND_PORT || 3000
app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`)
})