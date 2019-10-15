'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MedicineSchema extends Schema {
  up () {
    this.create('medicines', (table) => {
      table.increments()
      table.string('name', 500).notNullable()
      table.string('route_of_administration', 20).notNullable()
      table.string('concentration', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('medicines')
  }
}

module.exports = MedicineSchema
