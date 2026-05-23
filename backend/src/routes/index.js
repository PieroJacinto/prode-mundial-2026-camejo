const express = require('express')
const router = express.Router()
const { healthCheck }    = require('../controllers/healthController')
const usuariosController = require('../controllers/usuariosController')
const bracketController  = require('../controllers/bracketController')

router.get('/health',   healthCheck)
router.get('/usuarios', usuariosController.getAll)
router.get('/bracket',  bracketController.getBracket)

module.exports = router