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
    v-if="this.$store.getters.getDoctors"
    :block-keys="['Delete']"
    v-model="doctor"
    :options="doctors"
    :multiple="true"
    :taggable="true"
    @tag="addDoctor"
    @input="changeObserver()"
    :placeholder="$t('newPrescription.searchOrAddDoctor')"
  >
    <template slot="singleLabel" slot-scope="{ option }">
      <div>{{$t('multiselect.empty')}}</div>
    </template>
  </multiselect>
</template>

<script>
import Doctor from "src/backend/models/Doctor";

export default {
  data() {
    return {
      doctors: [],
      doctor: [],
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
    this.$store.commit("setDoctors", undefined);
  },
  methods: {
    asyncFind(query) {
      this.isLoading = true;
      Doctor.get(query).then(response => {
        this.doctors = response.data;
        this.isLoading = false;
      });
    },
    addDoctor(newDoctor) {
      this.doctor.push(newDoctor);
      this.$store.commit("setDoctors", this.doctor);
    },
    changeObserver() {
      this.$store.commit("setDoctors", this.doctor);
      return this.doctors;
    },
    async updateDoctors() {
      this.$store.getters.getDoctors
        ? this.$store.getters.getDoctors.forEach(doctor => {
            this.doctor.push(doctor);
          })
        : (this.doctor = []);
    },
    async populatedOptionsDoctors() {
      await Doctor.getAll()
        .then(result => {
          this.doctors = result.data;
        })
        .catch(e => {});
    }
  },
  created() {
    this.updateDoctors();
    this.populatedOptionsDoctors();
  }
};
</script>
<style>
</style>
