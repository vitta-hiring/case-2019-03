import httpService from './http.service'

export default {
  getPatients () {
    return httpService().get('patients')
  },

  postPatients (patient) {
    return httpService().post('patients', patient)
  },

  putPatients (patient, id) {
    return httpService().put(`patients/${id}`, {
      name: patient.name
    })
  },

  deletePatients (patient) {
    return httpService().delete('patients', {
      data: patient
    })
  }
}
