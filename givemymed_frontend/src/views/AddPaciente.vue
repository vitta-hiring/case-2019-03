<template>
  <form>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label>Nome do paciente</label>
        <input type="text" class="form-control" placeholder="Nome do paciente" v-model="paciente.nome">
      </div>

    </div>
    <button type="submit" class="btn btn-primary" @click="doAddPaciente(paciente)">Adicionar</button>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'
  import uuid from 'uuid/v1'

  export default {
    name: "AddPaciente",
    data() {
      return {
        paciente: {
          nome: ''
        }
      }
    },
    methods: {
      ...mapActions(['addPaciente']),
      doAddPaciente: function (paciente) {
        let medicoId = this.$route.params.id

        let payload = {
          medicoId,
          paciente: {
            id: uuid(),
            ...this.paciente,
            medicamentos: []
          }
        }
        this.addPaciente(payload)
      },
      clearPaciente(){
        this.paciente.nome = ''
      },

    },

  }
</script>

<style scoped>

</style>
