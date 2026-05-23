const bcrypt = require('bcrypt')
const pool = require('../config/db')

const authController = {

  register: async (req, res) => {
    try {
      const { nombre, email, password } = req.body

      // verificamos q no exista un usuario con ese email
      const existe = await pool.query(
        'SELECT id FROM usuarios WHERE email = $1',
        [email]
      )
      if (existe.rows.length > 0) {
        return res.status(400).json({ error: 'El email ya esta registrado' })
      }

      // hasheamos la password antes de guardarla
      const hash = await bcrypt.hash(password, 10)

      const result = await pool.query(
        'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email',
        [nombre, email, hash]
      )

      res.status(201).json(result.rows[0])

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body

      // buscamos el usuario por email
      const result = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
      )
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Email o password incorrectos' })
      }

      const usuario = result.rows[0]

      // comparamos la password con el hash guardado
      const passwordValida = await bcrypt.compare(password, usuario.password)
      if (!passwordValida) {
        return res.status(401).json({ error: 'Email o password incorrectos' })
      }

      // guardamos el usuario en la sesion
      req.session.usuario = {
        id:     usuario.id,
        nombre: usuario.nombre,
        email:  usuario.email
      }

      res.json({ mensaje: 'Login exitoso', usuario: req.session.usuario })

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  logout: async (req, res) => {
    req.session.destroy()
    res.json({ mensaje: 'Sesion cerrada' })
  },

  me: async (req, res) => {
    if (!req.session.usuario) {
      return res.status(401).json({ error: 'No hay sesion activa' })
    }
    res.json(req.session.usuario)
  }

}

module.exports = authController