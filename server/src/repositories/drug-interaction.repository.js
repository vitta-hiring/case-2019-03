(() => {
  'use strict';

  const mongoose = require('mongoose');
  const DrugInteraction = mongoose.model('DrugInteraction');

  exports.get = async () => {
    return await DrugInteraction.find({});
  };

  exports.create = async (data) => {
    const drugInteraction = new DrugInteraction(data);
    return await drugInteraction.save();
  };

  exports.update = async (id, data) => {
    return await DrugInteraction.findByIdAndUpdate(id, {
      $set: {
        first_active_principle: data.first_active_principle,
        seccond_active_principle: data.seccond_active_principle,
        name: data.name,
        description: data.description
      }
    });
  };

  exports.delete = async (id) => {
    return await DrugInteraction.findByIdAndRemove(id);
  };

})();
