(() => {
  'use strict';

  const mongoose = require('mongoose');
  const Medication = mongoose.model('Medication');

  exports.get = async () => {
    return await Medication.find({});
  };

  exports.getBySlug = async (slug) => {
    return await Medication.findOne({
      slug: slug
    }, 'slug name active_principles administration package_leaflet special_control ');
  };

  exports.getById = async (id) => {
    return await Medication.findById(id);
  };

  exports.getByPrinciples = async (active_principles) => {
    return await Medication.find({
      active_principles: active_principles
    }, 'id name slug active_principles');
  };

  exports.create = async (data) => {
    let medication = new Medication(data);
    return await medication.save();
  };

  exports.update = async (id, name) => {
    return await Medication.findByIdAndUpdate(id, {
      $set: {
        name: name
      }
    });
  };

  exports.delete = async (id) => {
    return await Medication.findByIdAndRemove(id);
  };

})();
