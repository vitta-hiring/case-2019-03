(function () {
    'use strict';

    const express = require('express');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');

    const app = express();

    // DB Connection
    mongoose.connect('mongodb://kalleopinheiro:Kalleo2461019@ds035787.mlab.com:35787/vitta_medication', {
        useNewUrlParser: true
    });

    // Models
    const Patient = require('./models/patient.model');
    const Doctor = require('./models/doctor.model');
    const Medication = require('./models/medication.model');
    const DoctorsPrescription = require('./models/doctors-prescription.model');
    const DrugInteraction = require('./models/drug-interaction.model');

    // Rotas
    const indexRoutes = require('./routes/index.route');
    const medicationRoutes = require('./routes/medication.route');
    const doctorRoutes = require('./routes/doctor.route');
    const patientRoutes = require('./routes/patient.route');
    const prescriptionRoutes = require('./routes/doctors-prescription.route');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));



    app.use('/', indexRoutes);
    app.use('/medications', medicationRoutes);
    app.use('/doctors', doctorRoutes);
    app.use('/patients', patientRoutes);
    app.use('/prescriptions', prescriptionRoutes);

    module.exports = app;
})();