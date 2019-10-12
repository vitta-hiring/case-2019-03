<template>
    <div
      class="full-width">
      <div
        class="layout-view layout-padding">
        <div class="form">
            <q-field
            icon="person"
            :error-label="$t('register.patient.errorLabel')">
            <q-input
              v-model="attendance.patient"
              :float-label="$t('register.patient.label')"
              class="full-width"
              ref="text" />
          </q-field>
          <q-field
            icon="person_outline"
            :error-label="$t('register.doctor.errorLabel')">
            <q-input
              v-model="attendance.doctorName"
              type="text"
              :float-label="$t('register.doctor.label')"
              class="full-width" />
          </q-field>
          <q-field
            :error-label="$t('register.drugs.errorLabel')"
            icon="accessibility">
            <q-select
              multiple
              filter
              chips
              :options="drugsOptions"
              v-model="attendance.drugs"
              type="text"
              :float-label="$t('register.drugs.label')"
              class="full-width" />
          </q-field>
          <div
            v-if="attendance && attendance.drugs && attendance.drugs.length"
            v-for="(drug, id) in attendance.drugs" :key="id">
            <div :style="colorNameDrug"> {{ drug.Nome }} </div>
            <q-field
              icon="book"
              :error-label="$t('register.posology.errorLabel')">
              <q-input
                v-model="attendance.drugs[id].posology"
                type="text"
                :float-label="$t('register.posology.label')"
                class="full-width" />
            </q-field>
            <q-field
              icon="bookmark"
              error-label="You'll need to specify the administationGuide">
              <q-input
                v-model="attendance.drugs[id].administationGuide"
                type="text"
                :float-label="$t('register.administrationGuide.label')"
                class="full-width" />
            </q-field>
          </div>
        </div>
        <div
          class="submit row reverse m-10">
          <q-btn class="m-5" color="primary" @click="save"> {{ $t('general.save') }} </q-btn>
          <q-btn class="m-5" color="secondary" @click="$router.go(-1)"> {{ $t('general.cancel') }} </q-btn>
        </div>
      </div>
    </div>
  </template>

<script>
import axios from 'axios'
import firebaseRequests from '../mixins/firebase-requests'
import {
  QBtn,
  QInput,
  QField,
  QSelect
} from 'quasar'

export default {
  mixins: [firebaseRequests],
  data () {
    return {
      drugs: [],
      errors: [],
      attendance: {
        createdAt: new Date(),
        drugs: []
      },
      interacoesMedicamentosas: []
    }
  },
  methods: {
    save () {
      const cbError = err => console.log(err)
      axios.post(
        'https://more-doctors.firebaseio.com/.json?auth=GJpN0QAMMAd3GudTrLE0ZVzlPnupwsNjygnTpVFk',
        this.attendance || {}
      )
        .then(() => {
          this.$q.notify({
            color: 'positive',
            icon: 'thumb_up',
            message: this.$t('general.savedSuccessfully'),
            position: 'bottom',
            timeout: 5000
          })
        })
        .catch(cbError)
        .finally(() => this.$router.push({ name: 'dashboard' }))
    },
    setDrugs () {
      this.drugs = JSON.parse(localStorage.getItem('medicamentos')) || []
      this.interacoesMedicamentosas = JSON.parse(localStorage.getItem('interacaoMedicamentosa')) || []
    }
  },
  watch: {
    'attendance.drugs': {
      handler: function (newValue, oldValue) {
        const drugs = newValue.map(el => el.Nome)
        this.errors = []
        const arr = this.interacoesMedicamentosas.reduce((acc, curr) => {
          const conditionFarmaco1 = drugs.includes(curr.Farmaco1)
          const conditionFarmaco2 = drugs.includes(curr.Farmaco2)

          if ((conditionFarmaco1 && conditionFarmaco2) || (conditionFarmaco1 && conditionFarmaco2)) {
            this.errors.push(curr)
            acc.push(curr.Descricao)
          }
          return acc
        }, [])

        if (arr.join('')) {
          this.$q.notify({
            color: 'negative',
            icon: 'warning',
            message: arr.join(' | '),
            position: 'bottom',
            timeout: arr.length * 10000
          })
        }
      },
      deep: true
    }
  },
  computed: {
    drugsOptions () {
      return this.drugs.map(el => ({
        label: el.Label,
        value: el
      }))
    },
    colorNameDrug () {
      return { color: this.errors && this.errors.length ? 'red' : '#027be3' }
    }
  },
  components: {
    QBtn,
    QInput,
    QField,
    QSelect
  },
  mounted () {
    this.setDrugs()
  }
}
</script>

<style scoped>
</style>
