'use strict'
const PrescriptionRepository = use('App/Repositories/PrescriptionRepository')

class PrescriptionController {
  index () {
    return (new PrescriptionRepository()).getWithRelations()
  }

  store ({ request }) {
    return (new PrescriptionRepository()).storeWithMedicines(request.all())
  }
}

module.exports = PrescriptionController
