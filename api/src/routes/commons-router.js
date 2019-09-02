'use strict'

const express = require('express');
const router = express.Router();

const controllerDoctor = require('../controllers/doctor-controller');
const controllerPatient = require('../controllers/patients-controller');

router.get('/doctors', controllerDoctor.get);
router.get('/patients', controllerPatient.get);

module.exports = router;