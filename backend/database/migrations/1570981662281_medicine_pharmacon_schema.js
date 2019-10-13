'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MedicinePharmaconSchema extends Schema {
  up () {
    this.create('medicine_pharmacon', (table) => {
      table.increments()
      table.integer('medicine_id', 10).notNullable()
      table.string('pharmacon', 500).notNullable()
    })
  }

  down () {
    this.drop('medicine_pharmacon')
  }
}

module.exports = MedicinePharmaconSchema
