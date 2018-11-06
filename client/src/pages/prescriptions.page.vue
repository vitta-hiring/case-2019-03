<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import moment from 'moment'
import patientService from './../services/patients.service'
import doctorService from './../services/doctors.service'
import medicationService from './../services/medications.service'
import interactionService from './../services/interactions.service'
import prescriptionService from './../services/prescriptions.service'

export default {
  name: 'PrescriptionsPage',

  mixins: [validationMixin],

  data: () => ({
    form: {
      doctors: null,
      patients: null,
      medications: null,
      posology: null
    },
    snack: false,
    interactions: [],
    alerts: [],
    selectedDoctor: [],
    selectedPatient: [],
    selectedMedications: [],
    alert: false,
    showMessage: '',
    sending: false
  }),

  validations: {
    form: {
      doctors: {
        required
      },
      patients: {
        required
      },
      medications: {
        required
      },
      posology: {
        required
      }
    }
  },

  mounted: function () {
    this.getData()
  },

  methods: {
    getData () {
      this.sending = true
      this.clearData()
      this.getPatients()
      this.getDoctors()
      this.getMedications()
      this.getInteractions()
      window.setTimeout(() => {
        this.sending = false
      }, 5000)
    },

    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },

    formatData (item) {
      return JSON.stringify(item)
    },

    clearForm () {
      this.$v.$reset()
      this.form.doctors = null
      this.form.patients = null
      this.form.medications = null
      this.form.posology = null
    },

    clearData () {
      this.selectedDoctor = []
      this.selectedPatient = []
      this.selectedMedications = []
      this.interactions = []
      this.form.patients = []
      this.form.doctors = []
      this.form.medications = []
      this.form.posology = ''
    },

    validateForm () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.verifyInteraction()
      }
    },

    async getPatients () {
      try {
        this.form.patients = []
        let array = await patientService.getPatients()
        array.data.map(item => {
          item.date_of_birth = moment(item.date_of_birth).format('MM/DD/YYYY')
          this.form.patients.push(item)
        })
      } catch (error) {
        console.log(error)
      }
    },

    async getDoctors () {
      try {
        this.form.doctors = []
        let array = await doctorService.getDoctors()
        array.data.map(item => {
          this.form.doctors.push(item)
        })
      } catch (error) {
        console.log(error)
      }
    },

    async getInteractions () {
      try {
        this.interactions = []
        let array = await interactionService.getInteractions()
        array.data.map(item => {
          this.interactions.push(item)
        })
      } catch (error) {
        console.log(error)
      }
    },

    async getMedications () {
      try {
        this.form.medications = []
        let array = await medicationService.getMedications()
        array.data.map(item => {
          this.form.medications.push(item)
        })
      } catch (error) {
        console.log(error)
      }
    },

    removeMedications (item) {
      let index = this.selectedMedications.indexOf(item)
      if (index > -1) {
        this.selectedMedications.splice(index, 1)
      }
    },

    async prescribeMedication () {
      this.sending = true
      let obj = {
        patient: this.selectedPatient,
        doctor: this.selectedDoctor,
        medications: this.selectedMedications,
        posology: this.form.posology,
        date: moment().format('MM/DD/YYYY')
      }
      try {
        await prescriptionService.postPrescriptions(obj)
        this.alert = false
        this.snack = true
        this.showMessage = 'Prescrição médica realizada com sucesso!'
      } catch (error) {
        this.snack = true
        this.showMessage = 'Falha ao realizar prescrição médica!'
      }
      this.clearData()
      this.clearForm()
      this.getData()
    },

    verifyInteraction () {
      this.alerts = []
      const activePrinciples = this.selectedMedications.reduce(
        (main, item) => main.concat(item.active_principles),
        []
      )

      const interactions = this.interactions.filter(
        item =>
          activePrinciples.includes(item.first_active_principle) &&
          activePrinciples.includes(item.seccond_active_principle)
      )

      interactions.map(item => this.alerts.push(item))

      if (!this.alerts.length) {
        this.prescribeMedication()
      } else {
        this.alert = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$list-width: 50vw;
.md-card {
  min-width: 50vw;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-content {
  width: 200px;
  height: 200px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.list {
  width: $list-width;
}

.full-control > .md-list {
  width: $list-width;
  max-width: 100%;
  height: 400px;
  display: inline-block;
  overflow: auto;
  border: 1px solid rgba(#000, 0.12);
  vertical-align: top;
}
</style>

<template>
  <div>
    <form
      novalidate
      class="md-layout"
      @submit.prevent="validateForm">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Prescrição de medicação</div>
        </md-card-header>

        <md-card-content
          v-if="!sending">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('form.doctors')">
                <label for="doctors">Médico</label>
                <md-select
                  id="doctors"
                  v-model="selectedDoctor"
                  :disabled="sending"
                  name="doctors">
                  <md-option
                    v-for="doctor in form.doctors"
                    :key="doctor._id"
                    :value="doctor">{{ doctor.name }}</md-option>
                </md-select>
                <span class="md-error">Campo obrigatorio!</span>
              </md-field>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('patients')">
                  <label for="patients">Paciente</label>
                  <md-select
                    id="patients"
                    v-model="selectedPatient"
                    :disabled="sending"
                    name="patients">
                    <md-option
                      v-for="patient in form.patients"
                      :key="patient._id"
                      :value="patient">{{ patient.name }}</md-option>
                  </md-select>
                  <span class="md-error">Campo obrigatorio!</span>
                </md-field>

                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('medications')">
                    <label for="medications">Medicações</label>
                    <md-select
                      id="medications"
                      v-model="selectedMedications"
                      :disabled="sending"
                      name="medications"
                      multiple>
                      <md-option
                        v-for="medication in form.medications"
                        :key="medication._id"
                        :value="medication">{{ medication.label }}</md-option>
                    </md-select>
                    <span class="md-error">Campo obrigatorio!</span>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('posology')">
                    <label>Posologia</label>
                    <md-textarea
                      :disabled="sending"
                      v-model="form.posology"/>
                    <span class="md-error">Campo obrigatorio!</span>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <div
                    v-if="selectedMedications.length > 0"
                    class="viewport">
                    <md-toolbar :md-elevation="1">
                      <span class="md-title">Medicações prescritas</span>
                    </md-toolbar>

                    <md-list
                      v-for="item in selectedMedications"
                      :key="item._id"
                      :value="item"
                      class="md-double-line">
                      <md-subheader
                        v-if="selectedMedications.length > 0"
                      >{{ item.label }}</md-subheader>

                      <md-list-item
                        v-if="selectedMedications.length > 0">
                        <md-icon class="md-primary">star</md-icon>

                        <div
                          v-if="selectedMedications.length > 0"
                          class="md-list-item-text">
                          <span>Uso: {{ item.administration }}</span>
                          <span>Princípios ativos: {{ item.active_principles }}</span>
                        </div>

                        <md-button
                          v-if="selectedMedications.length > 0"
                          class="md-icon-button md-list-action"
                          @click="removeMedications(item)">
                          <md-icon>clear</md-icon>
                        </md-button>

                      </md-list-item>

                      <md-divider/>

                    </md-list>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar
          v-if="sending"
          md-mode="indeterminate" />

        <md-card-actions
          class="md-layout md-gutter md-alignment-center-space-around">
          <md-button
            v-if="!sending"
            :disabled="sending"
            type="submit"
            class="md-primary">Prescrever medicação</md-button>
        </md-card-actions>
      </md-card>

      <div>
        <md-dialog
          :md-active.sync="alert"
          :esc-to-close="false"
          :md-click-outside-to-close="false">
          <md-dialog-title>Alertas</md-dialog-title>
          <md-dialog-content>
            <div class="full-control">
              <div class="list">
                <md-list
                  v-for="alert in alerts"
                  :md-expand-single="false"
                  :md-active.sync="alert"
                  :key="alert._id">
                  <md-list-item md-expand>
                    <md-icon>warning</md-icon>
                    <h4 class="md-list-item-text">{{ alert.name }}</h4>
                    <md-list slot="md-expand">
                      <p>{{ alert.description }}</p>
                    </md-list>
                  </md-list-item>
                </md-list>
              </div>
            </div>
          </md-dialog-content>
          <md-dialog-actions
            class="md-layout">
            <md-button
              class="md-accent md-raised"
              @click="alert = false">Cancelar</md-button>
            <md-button
              class="md-primary md-raised"
              @click="prescribeMedication()">Continuar mesmo assim</md-button>
          </md-dialog-actions>
        </md-dialog>

        <md-snackbar
          :md-position="center"
          :md-duration="3000"
          :md-active.sync="snack"
          class="md-layout md-gutter md-alignment-center-space-around">
          <span>{{ showMessage }}</span>
        </md-snackbar>
      </div>
    </form>
  </div>
</template>
