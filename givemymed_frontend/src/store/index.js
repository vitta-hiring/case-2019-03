import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let url = 'https://givemymed.herokuapp.com/'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase/auth'

export default new Vuex.Store({
  state: {
    isLoged: true,
    medicos: [],
  },
  mutations: {
    LOG_IN: (state, payload) => {
      state.isLoged = true
    },
    LOG_OUT: state => {
      localStorage.removeItem('userId')
      state.isLoged = false
    },
    ADD_MEDICO: (state, payload) => {
      state.medicos.push(payload)
    },
    LOAD_MEDICOS: (state,payload) => {
      state.medicos = payload
    }
  },
  actions: {
    cadastrar: (context, payload) => {
      createUserWithEmailAndPassword(payload.email, payload.senha)
        .catch( err => {
          Vue.$notify.error('Não foi possível criar o usuário. Verifique se o email está correto e a senha possui pelo menos 6 digitos')
        })
        .then( res => {
          if(res.operationType === 'signIn'){
            Vue.$notify.success('Cadastrado com sucesso!')
          }
        })
    },
    logIn: (context, payload) => {
      signInWithEmailAndPassword(payload.email, payload.senha)
        .catch( err => {
          Vue.$notify.error('Não foi possível logar-se. Verifique email e senha por gentileza.')
        })
        .then( res => {
          context.commit('LOG_IN', res.user.uid)
          return res.user.uid
        })
        .then( uid => {
          localStorage.setItem('userId', uid)
        })
        .then( () => true)
    },
    loadMedicos: context => {

      axios.get(url+'medicos')
        .then( res =>  res.data.reverse())
        .then( medicos => context.commit('LOAD_MEDICOS', medicos))

    },
    filterMedicos: (context, payload) => {
      axios.post(url+'medicos', payload)
        .then( res => res.data.reverse())
        .then( medicos => context.commit('LOAD_MEDICOS', medicos))
    },
    addMedico: (context, payload) => {
      axios.post(url+'addmedico', payload)
        .catch( err => Vue.$notify.error('Não foi possível realizar a operação') )
        .then( () => Vue.$notify.success('Medico adicionado com sucesso!') )

      context.commit('ADD_MEDICO', payload)
    },
    addPaciente: (context, payload) => {
      axios.post(url+'addpaciente', payload)
        .catch( err => Vue.$notify.error('Não foi possível realizar a operação'))
        .then( resp => {
          if(resp.status === 201) {
            Vue.$notify.success('Paciente adicionado com sucesso!')
          }
        })
    },
    loadPacientes: (context, payload) => {
      let id = payload

      axios.get(url+'pacientes/'+id)
        .catch( err => Vue.$notify.error('Não foi possível carregar os usúarios'))
        .then( res => {

          let paciente = res.data[0]
          console.log(paciente)

          let medico = context.state.medicos.filter( medico => medico.id == id)[0]
          medico.pacientes.push(paciente)
          console.log(medico)
        })
    }
  }
})
