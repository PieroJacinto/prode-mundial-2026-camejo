const pool = require('../config/db')

const usuariosController = {

  getAll: async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT id, nombre, email, matecitos FROM usuarios ORDER BY matecitos DESC'
      )
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ status: 'error', detalle: error.message })
    }
  }

}

module.exports = usuariosController