const express = require('express');
const routes = express.Router();
const PacientController = require('./controllers/PacienteController');
const MedicoController = require('./controllers/MedicoController');

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

module.exports = routes;
