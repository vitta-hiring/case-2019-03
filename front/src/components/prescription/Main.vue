<template>
  <div id="prescription-list" class="row-fluid">
    <div class="panel panel-default">
      <div class="panel-heading clearfix">
        <h4 class="panel-title pull-left" style="padding-top: 7.5px;">Prescricao Medica</h4>
        <div class="btn-group pull-right">
          <router-link class="btn btn-success btn-sm" to="/prescription/created">
            <i class="fa fa-plus-square-o"></i>&nbsp;Cadastrar nova
          </router-link>
        </div>
      </div>
      <div class="panel-body">

        <div class="panel panel-default">
          <div class="panel-body">
           <b-form>
            <div class="form-row">
              <div class="col-md-8">
                 <b-form-select class="form-control" id="patient_id" v-model="selected_patient" >
                  <option v-for="pat in patientList" :key="pat.id" :value="pat.id">
                    {{ pat.id }} - {{ pat.name }}
                  </option>
                </b-form-select>
              </div>
              <div class="col-md-2">
                  <button @click="buscar" type="button" class="btn btn-secondary"><i class="fa fa-search"></i>Consultar Prescricoes</button>
              </div>
              <div class="col-md-2">
                  <button @click="clearFilter"  class="btn btn-danger" to="/prescription"><i class="fa fa-eraser"></i></button>
              </div>
            </div>
          </b-form>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Medico</th>
                <th scope="col">Paciente</th>
                <th scope="col">Data</th>
                <th scope="col">Descricao</th>
                <th scope="col">Detalhes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in prescriptionList" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.doctor_name }}</td>
                <td>{{ item.patient_name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.created_at | moment("DD/MM/YYYY") }}</td>
                <td>
                  <button @click="getMedications(item.id)" class="btn btn-success btn-sm"><i class="fa fa-list" aria-hidden="true"></i></button>
                </td>
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
import router from '@/router'

export default {
  name: 'auth',
  data () {
    return {
      prescriptionList: [],
      patientList: [],
      selected_patient: null
    }
  },
  methods: {
    getMedications: function (id) {
      router.push({ path: `/prescription/${id}/medication` })
    },
    getPrescriptions: function () {
      http.get('prescription').then(response => {
        this.prescriptionList = response.data
      })
    },
    getPrescriptionsByPatientId: function (patientId) {
      http.get(`prescription/patient/${patientId}`).then(response => {
        this.prescriptionList = response.data
      })
    },
    getPatients: function () {
      http.get('patients').then(response => {
        this.patientList = response.data
      })
    },
    buscar: function () {
      if (this.selected_patient === null) {
        this.$toasted.error('Selecione um paciente')
      } else {
        this.getPrescriptionsByPatientId(this.selected_patient)
        router.push({ path: `/prescription/patient/${this.selected_patient}` })
      }
    },
    clearFilter: function () {
      this.getPrescriptions()
      this.selected_patient = null
      router.push({ path: `/prescription/` })
    }
  },
  created () {
    this.getPatients()
    if (this.$route.params.id !== undefined) {
      this.selected_patient = this.$route.params.id
      this.getPrescriptionsByPatientId(this.selected_patient)
    } else {
      this.getPrescriptions()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
