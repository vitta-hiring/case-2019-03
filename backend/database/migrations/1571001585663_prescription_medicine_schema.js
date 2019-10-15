'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PrescriptionMedicineSchema extends Schema {
  up () {
    this.create('prescription_medicine', (table) => {
      table.increments()
      table.integer('prescription_id', 10).notNullable()
      table.integer('medicine_id', 10).notNullable()
      table.string('route_of_administration', 20).notNullable()
      table.string('dosage', 500).notNullable()
    })
  }

  down () {
    this.drop('prescription_medicines')
  }
}

module.exports = PrescriptionMedicineSchema
