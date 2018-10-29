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
        date_of_bird: {
            type: Date,
            required: true
        },
        genre: {
            type: String,
            required: true,
            trim: true
        }
    });

    module.exports = mongoose.model('Patient', schema);
})();