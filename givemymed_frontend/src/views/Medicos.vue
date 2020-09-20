<template>
  <div>
    <form>
      <div class="form-group row">
        <div class="col-sm-4">
          <input type="text" class="form-control" placeholder="Id do Médico" v-model="medico.id">
        </div>
        <div class="col-sm-4">
          <input type="text" class="form-control" placeholder="Nome do médico" v-model="medico.nome">
        </div>

        <div class="col-sm-2">
          <div class="row">
            <button type="submit" class="btn btn-primary" @click="filterMedicos(medico)">Buscar</button>
          </div>
        </div>

        <div class="col-sm-2">
          <div class="row">
            <button type="submit" class="btn btn-success" @click="goToAddMedico()">Adicionar</button>
          </div>
        </div>

      </div>
    </form>

    <div class="list-group">
      <router-link
        class="list-group-item list-group-item-action"
        v-for="medico in medicos"
        :to="`/medico/${medico.id}`"
        :key="medico.id">
        {{medico.id}}: {{medico.nome}} - {{ medico.pacientes.length }} paciente(s)
      </router-link>
    </div>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: "Medicos",
    data(){
      return {
        medico: {
          id: null,
          nome: null
        }
      }
    },
    computed: {
      ...mapState(['medicos']),
    },
    methods: {
      ...mapActions(['loadMedicos', 'filterMedicos']),
      goToAddMedico(){
        this.$router.push({path: '/addmedico'})
      }
    },
    created(){
      this.loadMedicos()
    }
  }
</script>

<style scoped>
  .btn {
    margin-left: 5px;
  }
</style>
