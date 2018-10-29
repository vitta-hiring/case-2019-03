<template>
  <div>
    <h2>Buscar medicamento</h2>
    <form>
      <div class="form-group row">
        <div class="col-sm-4">
          <input type="text" class="form-control" placeholder="Id do medicamento" v-model="medicamento.id">
        </div>
        <div class="col-sm-4">
          <input type="text" class="form-control" placeholder="Nome do medicamento" v-model="medicamento.nome">
        </div>

        <div class="col-sm-2">
          <div class="row">
            <button type="submit" class="btn btn-primary" @click="filterMedicamentos(medicamento)">Buscar</button>
          </div>
        </div>
      </div>
    </form>

    <div class="progress" v-if="isFetching">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 76%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
    </div>

    <div class="form-group" v-if="medicamentos.length">
      <hr>

      <div class="input-group mb-3" v-for="medicamento in medicamentos"
           :key="medicamento.medicamentoId">
        <input class="form-control" :placeholder="`${medicamento.IdMedicamento} - ${medicamento.Nome}`">
        <div class="input-group-append">
          <button class="btn btn-success" type="button" @click="addMedicamento(medicamento)">Button</button>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "AddMedicamento",
    data(){
      return {
        medicamento: {
          id: null,
          nome: ''
        },
        medicamentos: [],
        isFetching: false
      }
    },
    methods: {
      filterMedicamentos(){
        this.medicamentos = []
        this.isFetching = true
        axios.post('https://givemymed.herokuapp.com/medicamentos', this.medicamento)
          .then( res => res.data)
          .then( medicamentos => this.medicamentos = medicamentos)
          .then( () => this.isFetching = false)
      },
      addMedicamento(medicamento){
        let medicoId = this.$route.params.medicoId
        let pacienteId = this.$route.params.id

        let payload = {
          medicoId,
          pacienteId,
          medicamento
        }

        axios.post('https://givemymed.herokuapp.com/addmedicamento', payload)
          .catch( err => this.$notify.error('Não foi possível realizar a operação'))
          .then( resp => {
            console.log(resp)
            if(resp.status === 201) {
              this.$notify.success('Medicamento adicionado com sucesso!')
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
