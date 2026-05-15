// importamos el pool de conexiones de la db
const pool = require('../config/db')


const healthCheck = async (req, res) => {
  try {
    // intentamos ejecutar una consulta minima a la db para verificar que funcione bien
    // select 1 no hace nada util, solamente verifica q funciona la conexion
    await pool.query('SELECT 1')
    res.json({ status: 'ok', db: 'conectada' })
  } catch (error) {
    res.status(500).json({ status: 'error', detalle: error.message })
  }
}

// exportamos el controlador 
module.exports = { healthCheck }