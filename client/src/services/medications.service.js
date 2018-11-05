import httpService from './http.service'

export default {
  getMedications () {
    return httpService().get('medications')
  },

  postMedications (medication) {
    return httpService().post('medications', medication)
  },

  putMedications (medication, id) {
    return httpService().put(`medications/${id}`, {
      name: medication.name
    })
  },

  deleteMedications (medications) {
    return httpService().delete('medications', {
      data: medications
    })
  }
}
