'use strict'

 const express = require('express');

const router = express.Router();

const controllermedico = require('../controllers/controller-medicamento');

router.get('/medicamentos', controllermedico.get);



 module.exports = router; 