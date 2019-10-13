'use strict'
const Prescription = use('App/Models/Prescription')
const PrescriptionMedicine = use('App/Models/PrescriptionMedicine')

class PrescriptionRepository {
  async storeWithMedicines (data) {
    const createdPrescription = await Prescription.create({
      doctor_id: data.doctor_id,
      patient_id: data.patient_id
    })

    await this.asyncForEach((data.medicines), async (medicine) => {
      await PrescriptionMedicine.create({
        prescription_id: createdPrescription.id,
        medicine_id: medicine.id,
        route_of_administration: medicine.route_of_administration,
        dosage: medicine.dosage
      })
    })

    return createdPrescription
  }

  async asyncForEach (array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }
}

module.exports = PrescriptionRepository
