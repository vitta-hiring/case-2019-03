(() => {
  'use strict';

  const mongoose = require('mongoose');
  const Doctor = mongoose.model('Doctor');

  exports.get = async () => {
    return await Doctor.find({});
  };

  exports.create = async (data) => {
    let doctor = new Doctor(data);
    return await doctor.save();
  };

  exports.update = async (id, data) => {
    return await Doctor.findByIdAndUpdate(id, {
      $set: {
        name: data.name,
        medical_specialty: data.medical_specialty
      }
    });
  };

  exports.delete = async (id) => {
    return await Doctor.findByIdAndRemove(id);
  };

})();
