'use strict'

 const express = require('express');

const router = express.Router();

const controllermedico = require('../controllers/controller-medico');

router.get('/medicos', controllermedico.get);
router.get('/medicos/:id', controllermedico.getById);
router.delete('/medicos/:id', controllermedico.deleteById);

 module.exports = router; 