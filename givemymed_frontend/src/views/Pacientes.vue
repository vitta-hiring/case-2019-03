<template>
  <div>
    <form>
      <div class="form-group row">
        <div class="col-sm-4">
          <input type="text" class="form-control" placeholder="Id do Paciente">
        </div>
        <div class="col-sm-4">
          <input type="text" class="form-control" placeholder="Nome do Paciente">
        </div>

        <div class="col-sm-2">
          <button type="submit" class="btn btn-primary">Buscar</button>
        </div>
      </div>
    </form>


    <div class="list-group">
      <!--<router-link-->
      <!--class="list-group-item list-group-item-action"-->
      <!--v-for="paciente in pacientes"-->
      <!--:to="`/paciente/${paciente.id}`">-->

      <!--{{paciente.nome}}-->

      <!--</router-link>-->
    </div>
  </div>

</template>

<script>
  export default {
    name: "Pacientes",
    data() {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
