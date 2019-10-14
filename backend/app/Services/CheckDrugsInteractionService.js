'use strict'

const MedicineRepository = use('App/Repositories/MedicineRepository')
const DrugInteractionRepository = use('App/Repositories/DrugInteractionRepository')

class CheckDrugsInteractionService {
  constructor () {
    this.medicinesWithPharmacons = []
    this.warnings = []
  }

  async run (data) {
    await this.loadMedicinesWithPharmacons(data)

    await this.walkThroughAllMedicines()

    return this.warnings
  }

  /**
   * Get medicines with pharmacons and save in internal attribute
   *
   * @param data
   * @returns {Promise<void>}
   */
  async loadMedicinesWithPharmacons (data) {
    let medicinesIds = data.medicines.map(medicine => medicine.id)
    const medicinesWithPharmacons = await (new MedicineRepository()).getByIdsWithPharmacons(medicinesIds)

    this.medicinesWithPharmacons = await medicinesWithPharmacons.toJSON()
  }

  /**
   * Walk into all medicines to access pharmacons of each one later
   *
   * @returns {Promise<void>}
   */
  async walkThroughAllMedicines () {
    await this.asyncForEach((this.medicinesWithPharmacons), async (medicine) => {
      await this.walkThroughMedicinePharmacons(medicine)
    })
  }

  /**
   * Walk into medicine pharmacons to check each one against all medicines later
   *
   * @param medicine
   * @returns {Promise<void>}
   */
  async walkThroughMedicinePharmacons (medicine) {
    await this.asyncForEach((medicine.pharmacons), async (pharmacon) => {
      await this.checkMedicineDrugInteractionByPharmacon (medicine, pharmacon)
    })
  }

  /**
   * Walk into all medicines again
   * But now I have a pharmacon and I'll look for drugs interaction later
   *
   * @param medicine
   * @param pharmacon
   * @returns {Promise<void>}
   */
  async checkMedicineDrugInteractionByPharmacon (medicine, pharmacon) {
    await this.asyncForEach((this.medicinesWithPharmacons), async (medicineFromLoop) => {

      if (medicine.id !== medicineFromLoop.id) {
        await this.checkWarningsInDrugsInteraction(medicineFromLoop, pharmacon)
      }

    })
  }

  /**
   * Given a medicine and a pharmacon I'll search possible drugs integration between
   * this pharmacon and all others pharmacon of the given medicine
   *
   * @param medicine
   * @param pharmacon
   * @returns {Promise<void>}
   */
  async checkWarningsInDrugsInteraction (medicine, pharmacon) {
    await this.asyncForEach((medicine.pharmacons), async (pharmaconFromLoop) => {

      const possibleDrugInteraction = await (new DrugInteractionRepository())
        .getByPharmacons(pharmacon.pharmacon, pharmaconFromLoop.pharmacon)

      if (possibleDrugInteraction.size()) this.warnings.push(possibleDrugInteraction.toJSON())
    })
  }

  async asyncForEach (array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }
}

module.exports = CheckDrugsInteractionService
