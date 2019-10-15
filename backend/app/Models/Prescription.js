'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Prescription extends Model {
  medicines () {
    return this.hasMany('App/Models/PrescriptionMedicine')
  }

  doctor () {
    return this.belongsTo('App/Models/Doctor')
  }

  patient () {
    return this.belongsTo('App/Models/Patient')
  }

  static castDates (field, value) {
    if (field === 'created_at') {
      return value ? value.format("DD/MM/YYYY") : value
    }

    return super.formatDates(field, value)
  }
}

module.exports = Prescription
