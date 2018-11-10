(() => {
  'use strict';

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const schema = new Schema({
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Doctor'
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Patient'
    },
    medications: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Medication'
    }],
    posology: {
      type: String,
      required: true,
      trim: true
    },
    use: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now()
    }
  });

  module.exports = mongoose.model('DoctorPrescription', schema);
})();
