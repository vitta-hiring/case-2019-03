'use strict'

const Medicine = use('App/Models/Medicine')
const MedicinePharmacon = use('App/Models/MedicinePharmacon')

class ImportMedicinesService {
  async run() {
    return await this.persistInDatabase(this.readFromJson())
  }

  readFromJson() {
    return require('../../dados/medicamentos.json')
  }

  async persistInDatabase(medicines) {
    await this.asyncForEach((medicines), async (medicine) => {
      const createdMedicine = await Medicine.create({
        'id': medicine.IdMedicamento,
        'name': medicine.Nome,
        'route_of_administration': medicine.ViaAdministracao,
        'concentration': medicine.Concentracao,
      })

      await this.asyncForEach((medicine.Farmacos), async (pharmacon) => {
        await MedicinePharmacon.create({
          'medicine_id': createdMedicine.id,
          'pharmacon': pharmacon,
        })
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
