(() => {
  'use strict';

  const config = require('./config');
  const express = require('express');
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose');

  const app = express();

  // DB Connection
  mongoose.connect(config.connectionString, {
    useNewUrlParser: true
  });

  // Models
  const Patient = require('./models/patient.model');
  const Doctor = require('./models/doctor.model');
  const Medication = require('./models/medication.model');
  const DoctorPrescription = require('./models/doctor-prescription.model');
  const DrugInteraction = require('./models/drug-interaction.model');

  // Routes
  const indexRoutes = require('./routes/index.route');
  const medicationRoutes = require('./routes/medication.route');
  const doctorRoutes = require('./routes/doctor.route');
  const patientRoutes = require('./routes/patient.route');
  const prescriptionRoutes = require('./routes/doctor-prescription.route');

  app.use(bodyParser.json({
    limit: '5mb'
  }));
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  // CORS hability
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

  app.use('/', indexRoutes);
  app.use('/medications', medicationRoutes);
  app.use('/doctors', doctorRoutes);
  app.use('/patients', patientRoutes);
  app.use('/prescriptions', prescriptionRoutes);

  module.exports = app;
})();
