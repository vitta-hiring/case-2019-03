'use strict'
const Medicine = use('App/Models/Medicine')

class MedicineRepository {
  searchByQueryName (queryName) {
    return Medicine
      .query()
      .where('name', 'like', '%' + queryName + '%')
      .limit(50)
      .fetch()
  }

  getByIdsWithPharmacons (ids) {
    return Medicine
      .query()
      .with('pharmacons')
      .whereIn('id', ids)
      .fetch()
  }
}

module.exports = MedicineRepository
