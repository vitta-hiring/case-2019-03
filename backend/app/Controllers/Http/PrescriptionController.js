'use strict'
const PrescriptionRepository = use('App/Repositories/PrescriptionRepository')
const CheckDrugsInteractionService = use('App/Services/CheckDrugsInteractionService')

class PrescriptionController {
  index () {
    return (new PrescriptionRepository()).getWithRelations()
  }

  async store ({ request }) {
    const drugsInteraction = await (new CheckDrugsInteractionService()).run(request.all())

    if (drugsInteraction.length) return {warnings: true, drugsInteraction}

    return (new PrescriptionRepository()).storeWithMedicines(request.all())
  }
}

module.exports = PrescriptionController
