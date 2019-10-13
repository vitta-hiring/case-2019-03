'use strict'

const DrugInteraction = use('App/Models/DrugInteraction')

class ImportDrugsInteractionService {
  async run () {
    return await this.persistInDatabase(this.readFromJson())
  }

  readFromJson () {
    return require('../../dados/interacao_medicamentosa.json')
  }

   async persistInDatabase(drugs_interaction) {
     await this.asyncForEach((drugs_interaction), async (drug_interaction) => {
      await DrugInteraction.create({
        'pharmacon_1': drug_interaction.Farmaco1,
        'pharmacon_2': drug_interaction.Farmaco2,
        'risk_level': drug_interaction.Nome,
        'description': drug_interaction.Descricao,
      })
    })
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}

module.exports = ImportDrugsInteractionService
