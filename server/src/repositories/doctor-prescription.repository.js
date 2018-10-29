(() => {
  'use strict';

  const mongoose = require('mongoose');
  const DoctorPrescription = mongoose.model('DoctorPrescription');

  exports.get = async () => {
    return await DoctorPrescription.find({})
      .populate('doctor', 'name medical_specialty')
      .populate('patient', 'name')
      .populate('medication', 'name active_principles administration package_leaflet special_control ');
  };

  exports.create = async (data) => {
    const doctorsPrescription = new DoctorPrescription(data);
    return await doctorsPrescription.save();
  };

  exports.update = async (id, data) => {
    return await DoctorPrescription.findByIdAndUpdate(id, {
      $set: {
        doctor: data.doctor,
        patient: data.patient,
        medications: data.medications,
        posology: data.posology
      }
    });
  };

  exports.delete = async (id) => {
    return await DoctorPrescription.findByIdAndRemove(id);
  };

})();
