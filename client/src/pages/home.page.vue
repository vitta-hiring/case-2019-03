<script>
import prescriptionService from './../services/prescriptions.service'
import moment from 'moment'

export default {
  name: 'HomePage',

  data: () => ({
    prescriptions: [],
    loading: true
  }),

  mounted: function () {
    this.prescriptions = []
    this.getPrescriptions()
  },

  methods: {
    async getPrescriptions () {
      try {
        this.prescriptions = []
        const array = await prescriptionService.getPrescriptions()
        array.data.map(item => {
          item.date = moment(item.date).format('DD/MM/YYYY')
          item.medications = item.medications
            .map(prescription => prescription.name)
            .join(', ')
          this.prescriptions.push(item)
        })
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.md-app-content .md-card {
  min-width: 50vw;
  height: auto;
}
</style>

<template id="home-page">
  <div
    v-if="loading">
    <md-progress-spinner
      :md-diameter="100"
      :md-stroke="10"
      md-mode="indeterminate"/>
  </div>
  <div
    v-else>
    <div>
      <h1 class="md-title md-layout md-gutter md-layout md-gutter md-alignment-center-space-around">Prescrições médicas</h1>
      <br>
      <md-card>
        <md-list class="md-triple-line">
          <md-list-item
            v-for="item in prescriptions"
            :key="item._id">
            <md-icon class="md-primary">star</md-icon>
            <div class="md-list-item-text">
              <span><b>Médico:</b> {{ item.doctor.name }}</span>
              <span><b>Paciente:</b> {{ item.patient.name }}</span>
              <p><b>Medicações:</b>{{ item.medications }}</p>
            </div>
          </md-list-item>
        </md-list>
      </md-card>
    </div>
  </div>
</template>
