'use strict'

/*
|--------------------------------------------------------------------------
| PatientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class PatientSeeder {
  async run () {
    await Factory
      .model('App/Models/Patient')
      .createMany(50)
  }
}

module.exports = PatientSeeder
