import httpService from './http.service'

export default {
  getPrescriptions () {
    return httpService().get('prescriptions')
  },

  postPrescriptions (prescription) {
    return httpService().post('prescriptions', prescription)
  },

  putPrescriptions (prescription, id) {
    return httpService().put(`prescriptions/${id}`, {
      name: prescription.name
    })
  },

  deletePrescriptions (prescription) {
    return httpService().delete('prescriptions', {
      data: prescription
    })
  }
}
