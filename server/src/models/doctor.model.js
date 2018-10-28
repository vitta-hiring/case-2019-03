(function () {
    'use strict';

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const schema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        medical_specialty: {
            type: String,
            required: true,
            trim: true
        },
        hospital: {
            type: String,
            required: true,
            trim: true
        }
    });

    module.exports = mongoose.model('Doctor', schema);
})();