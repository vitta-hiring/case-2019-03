<template>
  <div>
    <div class="col-md-12">
      <div class="form-row">
        <div class="form-group col-sm-6 col-md-4">
          <label for="paciente">Paciente</label>
          <select id="paciente" class="form-control" v-model="paciente" @change="getDadosPaciente(paciente.id)">
            <option>Selecione...</option>
            <option :key="index" v-for="(item, index) in pacientes" :value="item">{{item.name}}</option>
          </select>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Médico</th>
            <th scope="col">posologia</th>
            <th scope="col">Via de  administração</th>
            <th scope="col">Data</th>
          </tr>
        </thead>
        <tbody v-if="medicamentos.length">
          <tr :key="index" v-for="(item, index) in medicamentos">
            <td>{{item.Nome}}</td>
            <td>{{item.medico}}</td>
            <td>{{item.posologia}}</td>
            <td>{{item.ViaAdministracao}}</td>
            <td>{{item.data | moment('DD/MM/YYYY')}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          Nenhuma prescrição encontrada
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mainClass } from '../mixins/mainClass'
import service from '@/services/mock.service'

export default {
  name: 'app',
  components: { },
  mixins: [mainClass],
  data () {
    return {
      pacientes: [],
      paciente: { },
      medicamentos: [],
      prescricoes: []
    }
  },
  methods: {
    getDadosPaciente (id) {
      this.medicamentos = []
      this.prescricoes.forEach(e => {
        if (e.paciente.id === id) {
          this.medicamentos = e.medicamentos.map(m => {
            m.medico = e.medico.name
            m.data = e.data
            return m
          })
        }
      })
    },
    getPacientes () {
      service.getPacientes().then(result => {
        if (result) {
          this.pacientes = result.data
        }
      }).catch(() => {
        this.notify('Erro ao buscar o serviço!')
      })
    },
    getPrescricao () {
      this.prescricoes = service.getPrescricao()
    }
  },
  mounted () {
    this.getPacientes()
    this.getPrescricao()
  }
}
</script>
