'use strict'
const Doctor = use('App/Models/Doctor')

class DoctorController {
  index ({ request, response }) {
    return Doctor.all()
  }
}

module.exports = DoctorController
