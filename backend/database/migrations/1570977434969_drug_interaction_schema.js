'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DrugInteractionSchema extends Schema {
  up () {
    this.create('drugs_interaction', (table) => {
      table.increments()
      table.string('pharmacon_1', 100).notNullable()
      table.string('pharmacon_2', 100).notNullable()
      table.string('risk_level', 20).notNullable()
      table.string('description', 5000).notNullable()
    })
  }

  down () {
    this.drop('drugs_interaction')
  }
}

module.exports = DrugInteractionSchema
