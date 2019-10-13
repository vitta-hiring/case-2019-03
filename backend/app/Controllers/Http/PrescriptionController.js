'use strict'
const PrescriptionRepository = use('App/Repositories/PrescriptionRepository')

class PrescriptionController {
  store ({ request, response }) {
    return (new PrescriptionRepository).storeWithMedicines(request.all())
  }
}

module.exports = PrescriptionController
