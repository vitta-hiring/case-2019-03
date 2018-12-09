'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();


// Carrega os Models
//const Product = require('./models/product');
//const Customer = require('./models/customer');
//const Order = require('./models/order');

// Carrega as Rotas
const indexRoute = require('./routes/route-index');
const pacienteRoute = require('./routes/route-paciente');
const medicoRoute = require('./routes/route-medico');
const medicamentoRoute = require('./routes/route-medicamento');
const prescricaoRoute = require('./routes/route-prescricao');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/', pacienteRoute);
app.use('/', medicoRoute);
app.use('/', medicamentoRoute);
app.use('/', prescricaoRoute);

module.exports = app;