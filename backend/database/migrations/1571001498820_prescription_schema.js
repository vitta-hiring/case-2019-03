'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PrescriptionSchema extends Schema {
  up () {
    this.create('prescriptions', (table) => {
      table.increments()
      table.integer('doctor_id', 10).notNullable()
      table.integer('patient_id', 10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('prescriptions')
  }
}

module.exports = PrescriptionSchema
