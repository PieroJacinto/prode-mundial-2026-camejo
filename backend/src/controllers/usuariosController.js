const pool = require('../config/db')

const usuariosController = {

  getAll: async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT 
          id, 
          nombre, 
          email, 
          matecitos,
          RANK() OVER (ORDER BY matecitos DESC) AS posicion 
        FROM usuarios 
        ORDER BY matecitos DESC`
      )
      res.json(result.rows) // Devuelve todos los usuarios con su posición en el ranking cuando matecitos = 0
    } catch (error) {
      res.status(500).json({ status: 'error', detalle: error.message })
    }
  }

}

module.exports = usuariosController