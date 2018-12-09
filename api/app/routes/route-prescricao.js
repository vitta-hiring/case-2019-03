'use strict'

 const express = require('express');

const router = express.Router();

const controllerprescricao = require('../controllers/controller-prescricao');

router.post('/prescricao', controllerprescricao.create);
router.get('/prescricao/paciente/:id', controllerprescricao.getByPaciente);

 module.exports = router; 