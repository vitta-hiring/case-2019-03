<template>
  <div id="prescription-created" class="row-fluid">
    <div class="panel panel-default">
      <div class="panel-heading clearfix">
        <h4 class="panel-title pull-left" style="padding-top: 7.5px;">Cadastrar Prescricao</h4>
        <div class="btn-group pull-right">
          <router-link class="btn btn-danger btn-sm" to="/prescription">
            <i class="fa fa-arrow-left"></i>&nbsp;Voltar
          </router-link>
        </div>
      </div>
      <div class="panel-body">
         <b-form  @submit="onSubmit" >

          <div class="form-group">
            <label for="patient_id">Paciente</label>
            <div class="clearfix"></div>
            <div class="row">
               <div class="col-md-10">
                <b-form-select required class="form-control" id="patient_id" v-model="form.patient_id">
                  <option v-for="pat in patientList" :key="pat.id" :value="pat.id">
                    {{ pat.id }} - {{ pat.name }}
                  </option>
                </b-form-select>
               </div>
               <div class="col-md-2">
                  <button type="button" @click="buscar" class="btn btn-secondary"><i class="fa fa-search"></i>Consultar Prescricoes</button>
               </div>
            </div>

          </div>

          <div class="form-group">
            <label for="doctor_id">Medico</label>
            <b-form-select required class="form-control" id="doctor_id" v-model="form.doctor_id">
              <option v-for="doc in doctorList" :key="doc.id" :value="doc.id">
                {{ doc.id }} - {{ doc.name }}
              </option>
            </b-form-select>
          </div>

          <div class="form-group">
            <label for="description">Descricao</label>
            <b-form-input class="form-control" type="text" v-model="form.description" id="description" rows="3"></b-form-input>
          </div>

          <hr>

          <div class="form-group">
            <label for="exampleFormControlSelect2">Medicamento</label>
            <div class="clearfix"></div>
             <div class="row">
               <div class="col-md-10">
                <b-form-select class="form-control" v-model="selectedMedicationPrescription">
                  <option v-for="(med, idx) in medicationList" :key="idx" :value="med">
                    {{ med.id }} - {{ med.label }} - {{ med.concentration }}- {{ med.unit }} - {{ med.via_administration }}
                  </option>
                </b-form-select>
               </div>
               <div class="col-md-2">
                  <button type="button" @click="setMedicationsPrescriptions" class="btn btn-primary">Adicionar</button>
               </div>
             </div>
          </div>

          <hr>

          <div class="panel panel-default"  v-if="medicationsConflict.length > 0">
            <div class="panel-heading">ATENCAO</div>
            <div class="panel-body">
              <div class="alert alert-warning" role="alert" v-for="(conflict, idx) in medicationsConflict" :key="idx">
                <b class="text-uppercase-style"> {{ conflict.name }} </b> ::
                <b> {{ conflict.pharmaco_one }} + {{ conflict.pharmaco_pharmacos_two }} </b> {{ conflict.description }}
              </div>
            </div>
            <div class="panel-footer text-uppercase-style">
              <b-form-checkbox id="checkbox1"
                              v-model="form.ignore"
                              value=true
                              unchecked-value=false>
              Ignorar aviso e enviar prescricao
              </b-form-checkbox>
            </div>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Medicamento</th>
                <th scope="col">Concentracao</th>
                <th scope="col">Via.Admin.</th>
                <th scope="col">Remover</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(presc, idx) in form.medications" :key="idx">
                <th scope="row">{{ presc.id }}</th>
                <td>{{ presc.label }}</td>
                <td>{{ presc.concentration }}</td>
                <td>{{ presc.via_administration }}</td>
                <td>
                   <button @click="removeMedicationsPrescription(idx)" type="button" class="btn btn-primary">
                     <i class="fa fa-close"></i>
                   </button>
                </td>
              </tr>

            </tbody>
          </table>

          <hr>

          <button class="btn btn-success btn-sm" type="submit">SALVAR</button>

        </b-form>
        <br>
      </div>
    </div>
  </div>
</template>

<script>

import http from '@/http'
import router from '@/router'

export default {
  name: 'prescriptionCreated',
  data () {
    return {
      doctorList: [],
      patientList: [],
      medicationList: [],
      medicationsConflict: [],

      selectedMedicationPrescription: null,
      form: {
        medications: [],
        doctor_id: null,
        patient_id: null,
        description: null,
        ignore: false
      }
    }
  },
  methods: {
    onSubmit: function (evt) {
      evt.preventDefault()

      const medicationsIdList = []
      this.form.medications.forEach(data => {
        medicationsIdList.push(data.id)
      })

      const formSubmit = {}
      formSubmit.doctor_id = this.form.doctor_id
      formSubmit.patient_id = this.form.patient_id
      formSubmit.description = this.form.description
      formSubmit.medications = medicationsIdList
      formSubmit.ignore = this.form.ignore

      http.post('prescription', formSubmit)
        .then(response => {
          this.$toasted.success('Prescricao adicionada com sucesso!')
          router.push('/prescription')
        }).catch(error => {
          if (error.response.status === 409) {
            this.medicationsConflict = error.response.data
            this.$toasted.error('ATENCAO')
          } else if (error.response.status === 400) {
            error.response.data.forEach(msg => {
              this.$toasted.error(msg.message)
            })
          } else {
            this.$toasted.error('Um erro inesperado ocorreu')
          }
        })
    },
    getDoctors: function () {
      http.get('doctors').then(response => {
        this.doctorList = response.data
      })
    },
    getPatients: function () {
      http.get('patients').then(response => {
        this.patientList = response.data
      })
    },
    getMedications: function () {
      http.get('medications').then(response => {
        this.medicationList = response.data
      })
    },
    setMedicationsPrescriptions: function () {
      var MedPret = this.form.medications.filter(data => {
        return data === this.selectedMedicationPrescription
      })

      if (MedPret.length > 0) {
        this.$toasted.error('Medicamento ja adicionado')
        this.selectedMedicationPrescription = null
      } else {
        this.form.medications.push(this.selectedMedicationPrescription)
        this.selectedMedicationPrescription = null
      }
    },
    removeMedicationsPrescription: function (index) {
      this.form.medications = this.form.medications.filter(function (ele, idx) {
        return idx !== index
      })
      this.$toasted.success('Medicamento removido!')
    },
    buscar: function () {
      if (this.form.patient_id === null) {
        this.$toasted.error('Selecione um paciente')
      } else {
        router.push({ path: `/prescription/patient/${this.form.patient_id}` })
      }
    }
  },
  created () {
    this.getDoctors()
    this.getPatients()
    this.getMedications()
  }
}
</script>
<style lang="scss" scoped>

.text-uppercase-style {
  text-transform: uppercase;
}

</style>
