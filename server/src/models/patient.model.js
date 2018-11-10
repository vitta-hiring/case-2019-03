(() => {
  'use strict';

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const schema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    date_of_birth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      required: true,
      trim: true
    }
  });

  module.exports = mongoose.model('Patient', schema);
})();
