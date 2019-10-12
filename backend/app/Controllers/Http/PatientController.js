'use strict'
const Patient = use('App/Models/Patient')

class PatientController {
  index ({ request, response }) {
    return Patient.all()
  }
}

module.exports = PatientController
