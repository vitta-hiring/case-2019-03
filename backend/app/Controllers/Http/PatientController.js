'use strict'
const Patient = use('App/Models/Patient')

class PatientController {
  index () {
    return Patient.query().orderBy('name').fetch()
  }
}

module.exports = PatientController
