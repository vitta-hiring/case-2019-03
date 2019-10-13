'use strict'

const Medicine = use('App/Models/Medicine')

class ImportMedicinesService {
  async run () {
    return await this.persistInDatabase(this.readFromJson())
  }

  readFromJson () {
    return require('../../../dados/medicamentos.json')
  }

   async persistInDatabase(medicines) {
     await this.asyncForEach((medicines), async (medicine) => {
      await Medicine.create({
        'id': medicine.IdMedicamento,
        'name': medicine.Nome,
        'route_of_administration': medicine.ViaAdministracao,
        'concentration': medicine.Concentracao,
      })
    })
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}

module.exports = ImportMedicinesService
