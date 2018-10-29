(() => {
  'use strict';

  const mongoose = require('mongoose');
  const Patient = mongoose.model('Patient');

  exports.get = async () => {
    return await Patient.find({}, 'name');
  };

  exports.create = async (data) => {
    const patient = new Patient(data);
    return await patient.save();
  };

  exports.update = async (id, name) => {
    return await Patient.findByIdAndUpdate(id, {
      $set: {
        name: name
      }
    });
  };

  exports.delete = async (id) => {
    return await Patient.findByIdAndRemove(id);
  };
})();
