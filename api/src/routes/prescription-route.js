'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controllers/prescription-controller');

router.get('/', controller.get);
router.get('/:id/medications', controller.getMedicationPrescription);
router.post('/', controller.createPrescription);
module.exports = router;