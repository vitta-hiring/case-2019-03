'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');

var bugsnag = require('@bugsnag/js');
var bugsnagExpress = require('@bugsnag/plugin-express');

var bugsnagClient = bugsnag('KEY');
bugsnagClient.use(bugsnagExpress)

const app = express();

var middleware = bugsnagClient.getPlugin('express')

app.use(middleware.requestHandler)

bugsnagClient.notify(new Error('Iniciou'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

const index_route = require('./routes/index-router');
const commons_router = require('./routes/commons-router');
const medications_router = require('./routes/medication-router');
const prescription_router = require('./routes/prescription-route');

app.use('/', index_route);
app.use('/', commons_router);
app.use('/', medications_router);
app.use('/prescription', prescription_router);

app.use(middleware.errorHandler)

module.exports = app;
