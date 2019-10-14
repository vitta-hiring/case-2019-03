'use strict'
const DrugInteraction = use('App/Models/DrugInteraction')

class DrugInteractionRepository {
  getByPharmacons (pharmacon1, pharmacon2) {
    return DrugInteraction
      .query()
      .where('pharmacon_1', pharmacon1)
      .where('pharmacon_2', pharmacon2)
      .fetch()
  }
}

module.exports = DrugInteractionRepository
