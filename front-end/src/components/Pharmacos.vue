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
    v-if="this.$store.getters.getPharmacos"
    :block-keys="['Delete']"
    v-model="pharmaco"
    :options="pharmacos"
    :multiple="true"
    :taggable="true"
    @tag="addPharmaco"
    @input="changeObserver()"
    :placeholder="$t('newPrescription.searchOrAddPharmaco')"
  >
    <template slot="singleLabel" slot-scope="{ option }">
      <div>{{$t('multiselect.empty')}}</div>
    </template>
  </multiselect>
</template>

<script>
import Pharmaco from "src/backend/models/Pharmaco";

export default {
  data() {
    return {
      pharmacos: [],
      pharmaco: [],
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
    this.$store.commit("setPharmacos", undefined);
  },
  methods: {
    asyncFind(query) {
      this.isLoading = true;
      Pharmaco.get(query).then(response => {
        this.pharmacos = response.data;
        this.isLoading = false;
      });
    },
    addPharmaco(newPharmaco) {
      this.pharmaco.push(newPharmaco);
      this.$store.commit("setPharmacos", this.pharmaco);
    },
    changeObserver() {
      this.$store.commit("setPharmacos", this.pharmaco);
      return this.pharmacos;
    },
    async updatePharmacos() {
      this.$store.getters.getPharmacos
        ? this.$store.getters.getPharmacos.forEach(pharmaco => {
            this.pharmaco.push(pharmaco);
          })
        : (this.pharmaco = []);
    },
    async populatedOptionsPharmacos() {
      await Pharmaco.get()
        .then(result => {
          this.pharmacos = result.data;
        })
        .catch(e => {});
    }
  },
  created() {
    this.updatePharmacos();
    this.populatedOptionsPharmacos();
  }
};
</script>
<style>
</style>
