<template>
  <form>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label>Nome do médico</label>
        <input type="text" class="form-control" placeholder="Nome do médico" v-model="medico.nome">
      </div>

    </div>
    <button type="submit" class="btn btn-primary" @click="doAddMedico(medico)">Adicionar</button>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: "AddMedico",
    data(){
      return {
        medico: {
          nome: ''
        }
      }
    },
    methods: {
      ...mapActions(['addMedico']),
      doAddMedico(medico){
        this.addMedico(medico)
        setTimeout(this.clearNome, 50)

      },
      clearNome: function(){
        this.medico.nome = ''
      }
    }
  }
</script>

<style scoped>

</style>
