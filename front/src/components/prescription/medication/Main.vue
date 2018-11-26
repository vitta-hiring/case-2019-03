<template>
  <div id="prescription-medications-list">
    <div class="panel panel-default">
      <div class="panel-heading clearfix">
        <h4 class="panel-title pull-left" style="padding-top: 7.5px;">Medicamentos Utilizados</h4>
        <div class="btn-group pull-right">
          <router-link class="btn btn-danger btn-sm" to="/prescription">
            <i class="fa fa-arrow-left"></i>&nbsp;Voltar
          </router-link>
        </div>
      </div>
      <div class="panel-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Concentracao</th>
                <th scope="col">Unidade</th>
                <th scope="col">Via.Administracao</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in prescriptionMedicationsList" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.concentration }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.via_administration }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>

</template>
<script>

import http from '@/http'

export default {
  name: 'auth',
  data () {
    return {
      prescriptionMedicationsList: []
    }
  },
  methods: {
    getMedicationsPrescription: function (id) {
      http.get(`prescription/${id}/medications`).then(response => {
        this.prescriptionMedicationsList = response.data
      })
    }
  },
  created () {
    this.getMedicationsPrescription(this.$route.params.id)
  }
}
</script>
<style lang="scss" scoped>
</style>
