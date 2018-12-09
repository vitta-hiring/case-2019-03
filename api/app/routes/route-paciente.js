'use strict'

 const express = require('express');

const router = express.Router();

const controllerpaciente = require('../controllers/controller-paciente');

router.get('/pacientes', controllerpaciente.get);

 module.exports = router; 