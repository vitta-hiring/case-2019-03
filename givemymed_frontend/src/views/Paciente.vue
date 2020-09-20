<template>
  <div>
    <div v-if="paciente">
      <h3>Paciente {{ paciente.nome}}</h3>

      <button class="btn btn-primary" @click="goToAddMedicamento()">Adicionar Medicamento</button>

      <div class="row">
        <div class="card col-lg-3"
             :class="[medicamento.isDanger ? 'bgRed' : '']"
             v-for="medicamento in medicamentos" :key="medicamento.Id">
          <div class="card-body">
            <h5 class="card-title">{{medicamento.Nome}}</h5>
            <p class="card-text">{{medicamento.status ? medicamento.status : 'OK'}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import axios from 'axios'

  export default {
    name: "Paciente",
    computed: {
      ...mapState(['medicos']),
      medicamentos: function(){
        return this.paciente.medicamentos
      },
      conflitos: function(){

      }
    },
    created(){
      if(!this.medicos.length){
        this.$router.push({path: '/medico/'+ this.$route.params.medicoId})
      }

      let medico = this.medicos.filter(medico => medico.id == this.$route.params.medicoId )[0]
      let paciente = medico.pacientes.filter(paciente => paciente.id == this.$route.params.id)[0]
      this.paciente = paciente

      let farmacos = []

      this.paciente.medicamentos.map( medicamento => {
        farmacos.push(medicamento.Farmacos)
      })

      let conflitos = []

      axios.post('https://givemymed.herokuapp.com/interacoes', farmacos)
        .catch( err => console.log(err))
        .then( resp => conflitos = resp.data)
        .then( data => {
          this.paciente.medicamentos.map( medicamento => {
            medicamento.Farmacos.map( farmaco => {
              conflitos.map( conflito => {
                if(farmaco === conflito.Farmaco1 || farmaco === conflito.Farmaco2){
                  medicamento.isDanger = true
                  medicamento.status = 'em conflito!'
                  this.$forceUpdate()
                }
              })
            })
          })
        })


    },
    methods: {
      goToAddMedicamento(){
        this.$router.push({path: `/medico/${ this.$route.params.medicoId}/paciente/${this.$route.params.id}/addmedicamento`})
      }
    }
  }
</script>

<style scoped>
  .card {
    margin: 1em;
  }

  .bgRed {
    background-color: tomato;
  }
</style>
