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
      name: doctor.name,
      medical_speciality: doctor.medical_speciality,
      hospital: doctor.hospital
    })
  },

  deleteDoctors (doctor) {
    return httpService().delete('doctors', {
      data: doctor
    })
  }
}
