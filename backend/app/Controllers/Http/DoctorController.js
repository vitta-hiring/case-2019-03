'use strict'
const Doctor = use('App/Models/Doctor')

class DoctorController {
  index () {
    return Doctor.query().orderBy('name').fetch()
  }
}

module.exports = DoctorController
