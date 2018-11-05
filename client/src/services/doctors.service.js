import httpService from './http.service'

export default {
  getDoctors () {
    return httpService().get('doctors')
  },

  postDoctors (doctor) {
    return httpService().post('doctors', doctor)
  },

  putDoctors (doctor, id) {
    return httpService().put(`doctors/${id}`, {
      name: doctor.name
    })
  },

  deleteDoctors (doctor) {
    return httpService().delete('doctors', {
      data: doctor
    })
  }
}
