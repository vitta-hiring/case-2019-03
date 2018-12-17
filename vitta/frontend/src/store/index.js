import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
        novoAtendimento: {
            atendimentosAnteriores: [],
            medicamentosAnteriores: [],
            farmacosMedicamentos: new Map(),
            interacoes: [],
            medico: {},
            paciente: {},
            medicamentos: [],
            idAtendimento: 0
        }
    },
    mutations: {
      ATUALIZA_ATENDIMENTOS_ANTERIORES (state, payload) {
        state.novoAtendimento.atendimentosAnteriores = payload.atendimentos;
      },
      ATUALIZA_LISTA_MEDICAMENTOS_ANTERIORES (state, payload) {
        state.novoAtendimento.medicamentosAnteriores = payload.medicamentosAnteriores
      },
      LIMPA_LISTA_MEDICAMENTOS_ANTERIORES (state) {
        state.novoAtendimento.medicamentosAnteriores = []
      },
      GERA_ALERTAS_INTERACAO (state, { interacoes }) {
        state.novoAtendimento.interacoes = interacoes.map(i => {
            let color = 'info';
            if (i.gravidade === 'Grave') {
                color = 'error'
            } else if (i.gravidade === 'Moderada') {
                color = 'warning'
            }
            return { ...i, color }
        })
      },
      SELECIONA_MEDICO (state, { medico }) {
         state.novoAtendimento.medico = medico;
      },
      SELECIONA_PACIENTE (state, { paciente }) {
        state.novoAtendimento.paciente = paciente;
      },
      LIMPA_ALERTAS_INTERACAO (state) {
        state.novoAtendimento.interacoes = [];
      },
      ATUALIZA_MEDICAMENTOS_SELECIONADOS (state, { medicamentos }) {
        state.novoAtendimento.medicamentos = medicamentos;
      },
      ATENDIMENTO_GERADO (state, { idAtendimento }) {
        state.novoAtendimento.idAtendimento = idAtendimento;
      },
      NOVO_ATENDIMENTO_ESTADO_INICIAL (state) {
        state.novoAtendimento = {
            atendimentosAnteriores: [],
            medicamentosAnteriores: [],
            farmacosMedicamentos: new Map(),
            interacoes: [],
            medico: {},
            paciente: {},
            medicamentos: [],
            idAtendimento: 0
        };
      }
    },
    actions: {
        SELECIONA_PACIENTE: function ({ commit }, { paciente }) {
            commit('SELECIONA_PACIENTE', { paciente })
            axios.get(`http://localhost:3030/atendimentos/${paciente.id}`).then((response) => {
                commit('ATUALIZA_ATENDIMENTOS_ANTERIORES', { atendimentos: response.data })
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })
        },
        BUSCA_MEDICAMENTOS_ATENDIMENTO: function ({ commit }, { idAtendimento }) {
            commit('LIMPA_LISTA_MEDICAMENTOS_ANTERIORES')
            axios.get(`http://localhost:3030/atendimento/medicamentos/${idAtendimento}`)
            .then((response) => {
                commit('ATUALIZA_LISTA_MEDICAMENTOS_ANTERIORES', { medicamentosAnteriores: response.data })
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })
        },
        VALIDA_INTERACOES: function ({ commit }) {
            const idsMedicamentos = this.state.novoAtendimento.medicamentos.map(({ id: idMedicamento }) => idMedicamento).join('-');
            axios.get(`http://localhost:3030/validaInteracoes/${idsMedicamentos}`)
            .then((response) => {
                commit('GERA_ALERTAS_INTERACAO', { interacoes: response.data })
                return true;
            }, (err) => {
                console.log(err)
                return false;
            })
        },
        SELECIONA_MEDICAMENTO: function ({ commit }, { medicamentos }) {
            commit('ATUALIZA_MEDICAMENTOS_SELECIONADOS', { medicamentos })
        },
        GERAR_ATENDIMENTO: function ({ commit }, { parecer }) {
            let atendimento = {
                medico: this.state.novoAtendimento.medico.id,
                paciente: this.state.novoAtendimento.paciente.id,
                parecer,
                medicamentos: this.state.novoAtendimento.medicamentos.map(m => m.id)
            }
            axios.post(`http://localhost:3030/novoAtendimento/`, { data: { atendimento } })
            .then((response) => {
                commit('ATENDIMENTO_GERADO', { idAtendimento: response.data })
                return true;
                }, (err) => {
                    console.log(err)
                    return false;
            })
        }
    }
  })
}

export default createStore