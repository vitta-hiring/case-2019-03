(() => {
  'use strict';

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const schema = new Schema({
    slug: {
      type: Number,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    active_principle: {
      type: String,
      trim: true,
      index: true
    },
    active_principles: [{
      type: String,
      trim: true,
      required: true,
      index: true
    }],
    concentration: {
      type: String,
      trim: true
    },
    unity_federation: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      trim: true
    },
    pharmaceutical_form: {
      type: String,
      trim: true
    },
    administration: {
      type: String,
      trim: true,
      required: true
    },
    atc_code: {
      type: String,
      trim: true,
      required: true
    },
    internal_use: {
      type: Boolean
    },
    antimicrobial: {
      type: Boolean
    },
    package_leaflet: {
      type: String,
      trim: true
    },
    ordinance_344: {
      type: String
    },
    special_control: {
      type: Boolean
    },
    tiss: {
      type: String,
      trim: true
    },
    mip: {
      type: Boolean
    },
    label: {
      type: String
    },
    unified: {
      type: Boolean
    }
  });

  module.exports = mongoose.model('Medication', schema);
})();
