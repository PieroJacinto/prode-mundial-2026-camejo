const { Pool } = require('pg')
// importamos pool de la libreria pg, que es un cliente de postgres para nodejs, 
// pool es es un conjuntio de conexiones que se pueden reutilizar, para no abrir y cerrar la conexion en cad query
const pool = new Pool({
  host:     process.env.POSTGRES_HOST,
  port:     process.env.POSTGRES_PORT,
  user:     process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
})

module.exports = pool