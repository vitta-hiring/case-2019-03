const express = require('express');
const routes = express.Router();
const PacientController = require('./controllers/PacienteController');
const MedicoController = require('./controllers/MedicoController');
const MedicamentoController = require('./controllers/MedicamentoController');
const PrescricaoController = require('./controllers/PrescricaoController');

//Paciente
routes.get('/pacientes', PacientController.findall);

routes.get('/paciente/:id', PacientController.find);

routes.post('/paciente', PacientController.post);

routes.put('/paciente/:id', PacientController.update);

//Medico
routes.get('/medicos', MedicoController.findall);

routes.get('/medico/:id', MedicoController.find);

routes.post('/medico', MedicoController.post);

routes.put('/medico/:id', MedicoController.update);

//Medicamento
routes.get('/medicamentos', MedicamentoController.findall);

routes.get('/medicamento/:id', MedicamentoController.find);

routes.post('/medicamento', MedicamentoController.post);

routes.put('/medicamento/:id', MedicamentoController.update);

//Prescrição
routes.post('/prescricao', PrescricaoController.post);

module.exports = routes;
