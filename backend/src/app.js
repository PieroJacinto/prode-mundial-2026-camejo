require('dotenv').config()
// importamos express que es el framework para poder crear el servidor y manekjar las rutas de la api. 
const express = require('express')
// agrego cors para manejar los permisos de acceso
const cors = require('cors')

const session = require('express-session') 
// creamos la instancia de la aplicacion express (lo ejecutamos) para poder usar sus distintos metodos y funcionalidades
const app = express()

// le doy permiso a localhost para desarrollo, en prod cambiar al url del host del front
app.use(cors({
  origin: 'http://localhost',
  credentials: true
}))
// este es un middkeware global , que le dice a express que todos los requests que nos lleguen van a ser json
// entonces exppres automaticamente parsea el body de los req y los convierto a objet js para q podamos trabajar
app.use(express.json())

// configuro la session
app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto_desarrollo',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,  // la cookie no es accesible desde JS del browser
    maxAge: 1000 * 60 * 60 * 24  // 1 dia en milisegundos
  }
}))

const routes = require('./routes/index')
const authRoutes = require('./routes/authRoutes')
// importamos las rutas de la api,  todas van a etsar bajo el prefijo /api
app.use('/api', routes)
app.use('/api/auth', authRoutes)

// arrancamos el servidor en el puerto 3000, va a quedar escuchando los requests entrantes
const PORT = process.env.BACKEND_PORT || 3000
app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`)
})