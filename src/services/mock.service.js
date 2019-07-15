import axios from 'axios'
import configs from '@/config'

const USER_SESSION = 'u_Slt'
const PRESCRICAO = 's_Presc'

export default {
  getWindowStorage () {
    const storage = window.localStorage
    return storage
  },

  setUserSession (user) {
    const userConvert = btoa(JSON.stringify(user))
    this.getWindowStorage().setItem(USER_SESSION, userConvert)
  },

  getUserSession () {
    const user = JSON.parse(atob(this.getWindowStorage().getItem(USER_SESSION)))
    return user
  },

  removeUserSession () {
    this.getWindowStorage().removeItem(USER_SESSION)
  },

  setPrescricao (prescricao) {
    this.getWindowStorage().setItem(PRESCRICAO, JSON.stringify(prescricao))
  },

  getPrescricao () {
    let pacientes = JSON.parse(this.getWindowStorage().getItem(PRESCRICAO))
    return pacientes
  },

  removePrescricao () {
    this.getWindowStorage().removeItem(PRESCRICAO)
  },

  getAuthentication () {
    return axios.get(`${configs.baseUrl}/login`)
  },

  getMedicamentos () {
    return axios.get(`${configs.baseUrl}/medicamentos`)
  },

  getInteracaoMedicamentosa () {
    return axios.get(`${configs.baseUrl}/interacao-medicamentosa`)
  },

  getMedicos () {
    return axios.get(`${configs.baseUrl}/medicos`)
  },

  getPacientes () {
    return axios.get(`${configs.baseUrl}/pacientes`)
  }
}
