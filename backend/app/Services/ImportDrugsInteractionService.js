'use strict'

const DrugInteraction = use('App/Models/DrugInteraction')

class ImportDrugsInteractionService {
  async run () {
    return this.persistInDatabase(this.readFromJson())
  }

  readFromJson () {
    return require('../../dados/interacao_medicamentosa.json')
  }

  async persistInDatabase (drugsInteraction) {
    await this.asyncForEach((drugsInteraction), async (drugInteraction) => {
      await DrugInteraction.create({
        pharmacon_1: drugInteraction.Farmaco1,
        pharmacon_2: drugInteraction.Farmaco2,
        risk_level: drugInteraction.Nome,
        description: drugInteraction.Descricao
      })
    })
  }

  async asyncForEach (array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }
}

module.exports = ImportDrugsInteractionService
