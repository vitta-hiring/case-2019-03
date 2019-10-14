'use strict'
const Patient = use('App/Models/Patient')

class PatientController {
  index () {
    return Patient.all()
  }
}

module.exports = PatientController
