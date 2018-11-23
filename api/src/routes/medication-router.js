'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controllers/medication-controller');

router.get('/medications', controller.getMedications);
router.get('/medications_interventions', controller.getInterventionMedications);
router.post('/medications_interventions/checkMedicationIntervention', controller.checkMedicationIntervention);

module.exports = router;