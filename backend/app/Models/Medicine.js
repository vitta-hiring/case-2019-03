'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Medicine extends Model {
  pharmacons () {
    return this.hasMany('App/Models/MedicinePharmacon')
  }
}

module.exports = Medicine
