<template>
  <multiselect
    :searchable="true"
    :loading="isLoading"
    :internal-search="true"
    :clear-on-select="true"
    :close-on-select="true"
    :selectLabel="$t('multiselect.pressEnter')"
    :deselectLabel="$t('multiselect.pressRemove')"
    :tagPlaceholder="$t('multiselect.pressCreate')"
    track-by="name" label="name"
    v-if="this.$store.getters.getPatients"
    :block-keys="['Delete']"
    v-model="patient"
    :options="patients"
    :multiple="true"
    :taggable="true"
    @tag="addPatient"
    @input="changeObserver()"
    :placeholder="$t('newPrescription.searchOrAddPatient')"
  >
    <template slot="singleLabel" slot-scope="{ option }">
      <div>{{$t('multiselect.empty')}}</div>
    </template>
  </multiselect>
</template>

<script>
import Patient from "src/backend/models/Patient";

export default {
  data() {
    return {
      patients: [],
      patient: [],
      isLoading: false
    };
  },
  props: {
    taggable: {
      type: Boolean,
      default: false
    }
  },
  beforeDestroy() {
    this.$store.commit("setPatients", undefined);
  },
  methods: {
    asyncFind(query) {
      this.isLoading = true;
      Patient.get(query).then(response => {
        this.patients = response.data;
        this.isLoading = false;
      });
    },
    addPatient(newPatient) {
      this.patient.push(newPatient);
      this.$store.commit("setPatients", this.patient);
    },
    changeObserver() {
      this.$store.commit("setPatients", this.patient);
      return this.patients;
    },
    async updatePatients() {
      this.$store.getters.getPatients
        ? this.$store.getters.getPatients.forEach(patient => {
            this.patient.push(patient);
          })
        : (this.patient = []);
    },
    async populatedOptionsPatients() {
      await Patient.getAll()
        .then(result => {
          this.patients = result.data;
        })
        .catch(e => {});
    }
  },
  created() {
    this.updatePatients();
    this.populatedOptionsPatients();
  }
};
</script>
<style>
</style>
