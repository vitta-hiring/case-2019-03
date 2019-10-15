'use strict'
const MedicineRepository = use('App/Repositories/MedicineRepository')

class MedicineController {
  search ({ request }) {
    return (new MedicineRepository())
      .searchByQueryName(request.input('query'))
  }
}

module.exports = MedicineController
