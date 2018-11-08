import axios from 'axios'

export default {
  data: () => ({
    cbError: err => console.log(err)
  }),
  methods: {
    hardMethod (obj) {
      return Object.keys(obj).map(el => ({...obj[el]}))
    },
    findInteracoes () {
      return axios.get('https://more-doctors-interacao-medicamentosa.firebaseio.com/.json?auth=N4lraMOHx4DyMvfSK1LHjMfracd73TRktcVSV9hY')
        .then(({ data }) => localStorage.setItem('interacaoMedicamentosa', JSON.stringify(data)))
        .catch(this.cbError)
    },
    findPrescricoes () {
      return axios.get('https://more-doctors.firebaseio.com/.json?auth=GJpN0QAMMAd3GudTrLE0ZVzlPnupwsNjygnTpVFk')
        .then(({ data }) => localStorage.setItem('prescriptions', JSON.stringify(this.hardMethod(data))))
        .catch(this.cbError)
    },
    findMedicamentos () {
      return axios.get('https://more-doctors-medicamentos.firebaseio.com/.json?auth=CoN9yP7XA1bs4GKB5FQhr1GuQuYNwWtMhSyn12Ii')
        .then(({ data }) => localStorage.setItem('medicamentos', JSON.stringify(data)))
        .catch(this.cbError)
    }
  },
  created () {
    this.findInteracoes()
    this.findPrescricoes()
    this.findMedicamentos()
  }
}
