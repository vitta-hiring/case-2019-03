<template>
  <div>
    <div class="col-md-12">
      <form novalidate>
        <div class="form-row">
          <div class="form-group col-sm-6 col-md-4">
            <label for="paciente">Paciente</label>
            <select id="paciente" class="form-control" v-model="model.paciente">
              <option>Selecione...</option>
              <option :key="index" v-for="(item, index) in pacientes" :value="item">{{item.name}}</option>
            </select>
            <span class="text-danger">{{errors.paciente}}</span>
          </div>
          <div class="form-group col-sm-6 col-md-4">
            <label for="medico">Médico</label>
            <select id="medico" class="form-control" v-model="model.medico">
              <option>Selecione...</option>
              <option :key="index" v-for="(item, index) in medicos" :value="item">{{item.name}}</option>
            </select>
            <span class="text-danger">{{errors.medico}}</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-sm-6 col-md-4">
            <label for="medicamento">Medicamento</label>
            <select id="medicamento" class="form-control" v-model="model.medicamento">
              <option>Selecione...</option>
              <option :key="index" v-for="(item, index) in medicamentos" :value="item">{{item.Nome}}</option>
            </select>
            <span class="text-danger">{{errors.medicamento}}</span>
          </div>
          <div class="form-group col-sm-6 col-md-4">
            <label for="posologia">Posologia</label>
            <input id="posologia" type="text" v-model="model.posologia" class="form-control" required>
            <span class="text-danger">{{errors.posologia}}</span>
          </div>
        </div>
      </form>
      <button type="submit" class="btn btn-primary" @click.stop.prevent="adicionarMedicacao(model.medicamento)">Adicionar medicamento</button>
      <div class="form-group">
        <!-- <input type="password" placeholder="senha" v-model="password" class="form-control" required>
        <span class="text-danger">{{errors.password}}</span> -->
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">posologia</th>
            <th scope="col">Via de  administração</th>
            <th scope="col">Concentracao</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(item, index) in medicamentosSelecionados">
            <th scope="row">{{item.Nome}}</th>
            <td>{{item.posologia}}</td>
            <td>{{item.ViaAdministracao}}</td>
            <td>{{item.Concentracao}} {{item.Unidade}}</td>
          </tr>
        </tbody>
      </table>
      <button type="submit" class="btn btn-primary" v-if="medicamentosSelecionados.length > 0" @click="criarPrescricao">Criar Prescrição</button>
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
      errors: { },
      model: { },
      pacientes: [],
      medicos: [],
      medicamentosSelecionados: [],
      medicamentos: [],
      interacaoMedicamentosa: [],
      searchInteracao: {},
      posologia: '',
      prescricoes: []
    }
  },
  methods: {
    verifyForm () {
      this.errors = { }
      let result = true

      if (!this.model.paciente) {
        this.errors.paciente = 'Campo obrigatório'
        result = false
      }
      if (!this.model.medico) {
        this.errors.medico = 'Campo obrigatório'
        result = false
      }
      if (!this.model.medicamento) {
        this.errors.medicamento = 'Campo obrigatório'
        result = false
      }
      if (!this.model.posologia) {
        this.errors.posologia = 'Campo obrigatório'
        result = false
      }

      return result
    },
    adicionarMedicacao (medicamento, e) {
      let interacaoEncontrada = false
      if (this.verifyForm()) {
        if (this.medicamentosSelecionados.length > 0) {
          for (let i = 0; i < medicamento.Farmacos.length; i++) {
            this.medicamentosSelecionados.forEach(ms => {
              if (ms.Nome === medicamento.Nome) {
                this.notify('Medicamento já adicionado')
                interacaoEncontrada = true
              } else {
                let searchInteracao = ms.Farmacos.filter(x => x === medicamento.Farmacos[i])[0]
                if (searchInteracao) {
                  interacaoEncontrada = true
                  this.verifyInteracaoMedicamentosa(medicamento, ms.Nome, searchInteracao)
                }
              }
            })
          }
          if (!interacaoEncontrada) {
            this.inserirNaLista(medicamento)
          }
        } else {
          this.inserirNaLista(medicamento)
        }
      }
    },
    inserirNaLista (medicamento) {
      medicamento.posologia = this.model.posologia
      this.medicamentosSelecionados.push(medicamento)
    },
    verifyInteracaoMedicamentosa (novo, outro, searchInteracao) {
      let result = false
      this.interacaoMedicamentosa.forEach(el => {
        if (el.Farmaco1 === searchInteracao || el.Farmaco2 === searchInteracao) {
          result = true
          this.notify(`Interação medicamentosa ${el.Nome} encontrada entre ${novo.Nome} e ${outro} : ${el.Descricao}`)
        }
      })
      if (!result) {
        this.notify(`Interação medicamentosa encontrada entre ${novo.Nome} e ${outro} : Descrição...`)
      }
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
    getMedicos () {
      service.getMedicos().then(result => {
        if (result) {
          this.medicos = result.data
        }
      }).catch(() => {
        this.notify('Erro ao buscar o serviço!')
      })
    },
    getMedicamentos () {
      service.getMedicamentos().then(result => {
        if (result) {
          this.medicamentos = result.data
        }
      }).catch(() => {
        this.notify('Erro ao buscar o serviço!')
      })
    },
    getInteracaoMedicamentosa () {
      service.getInteracaoMedicamentosa().then(result => {
        if (result) {
          this.interacaoMedicamentosa = result.data
        }
      }).catch(() => {
        this.notify('Erro ao buscar o serviço!')
      })
    },
    getUser () {
      let user = service.getUserSession()
      console.log(user)
    },
    criarPrescricao () {
      let prescricao = { }
      prescricao.medico = this.model.medico
      prescricao.paciente = this.model.paciente
      prescricao.medicamentos = this.medicamentosSelecionados
      prescricao.data = new Date()
      this.prescricoes.push(prescricao)
      service.setPrescricao(this.prescricoes)
    },
    notify (msg) {
      this.$notify({
        group: 'foo',
        title: 'Important message',
        text: msg
      })
    }
  },
  mounted () {
    this.getInteracaoMedicamentosa()
    this.getPacientes()
    this.getMedicos()
    this.getPacientes()
    this.getMedicamentos()
  }
}
</script>
