(function () {
    'use strict';

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const schema = new Schema({
        doctor: {
            type: String,
            required: true,
            trim: true
        },
        patient: {
            type: String,
            required: true,
            trim: true
        },
        medications: [{
            type: String,
            required: true,
            trim: true
        }],
        posology: {
            type: String,
            required: true,
            trim: true
        },
    });

    module.exports = mongoose.model('DoctorsPrescription', schema);
})();