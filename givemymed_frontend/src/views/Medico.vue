<template>
  <div v-if="medico">
    <h3>{{ saudacao }}, {{ medico.nome }} <br>
      <small class="text-muted">Aqui está sua lista de pacientes</small>
    </h3>

    <button class="btn btn-success btn-full" @click="goToAddPaciente()">Adicionar paciente</button>

    <div class="list-group">
      <router-link
          class="list-group-item list-group-item-action"
          v-for="paciente in pacientes"
          :key="paciente.id"
          :to="`${$route.params.id}/paciente/${paciente.id}`">

        {{paciente.nome}}

      </router-link>
    </div>
  </div>

  <div class="progress" v-else style="padding: 0">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
  </div>

</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: "Medico",
    computed: {
      ...mapState(['medicos']),
      medico(){
        let medicos = this.medicos
        let m = null
        medicos.filter( medico => {
          if(medico.id == this.$route.params.id) m = medico
        })
        return m
      },
      pacientes(){
        let pacientes = []
        this.medico.pacientes.map( p => pacientes.push(p))
        return pacientes
      },
      saudacao(){
        let hora = new Date().getHours()
        let saudacao = 'Olá'

        if(hora > 18 || hora < 6) saudacao = 'Boa noite'
        else if(hora >= 6 && hora < 11) saudacao = 'Bom dia'
        else saudacao = 'Boa tarde'

        return saudacao
      },
    },
    methods: {
      ...mapActions(['loadMedicos', 'loadPacientes']),
      goToAddPaciente(){
        this.$router.push({path: `/medico/${ this.$route.params.id}/addpaciente`})
      }
    },
    created() {
      if(!this.medicos.length){
        this.loadMedicos()
        this.loadPacientes(this.$route.params.id)

      }
    },
  }
</script>

<style scoped>

</style>
