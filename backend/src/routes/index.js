const express = require('express')
const router = express.Router()
const { healthCheck } = require('../controllers/healthController')
const usuariosController  = require('../controllers/usuariosController')

router.get('/health', healthCheck)
router.get('/usuarios', usuariosController.getAll)

module.exports = router