<script>
import medicationService from './../services/medications.service'

export default {
  name: 'MedicationsPage',

  data: () => ({
    medications: [],
    search: null,
    searchedItems: [],
    medicationId: null,
    loading: true
  }),

  mounted: function () {
    this.medications = []
    this.getMedications()
    this.searchedItems = this.medications
  },

  methods: {
    async getMedications () {
      try {
        this.searchedItems = []
        this.medications = []
        const array = await medicationService.getMedications()
        array.data.map(item => {
          this.medications.push(item)
        })
        this.searchedItems = this.medications
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },

    async removeMedications (medication) {
      const toDelete = {
        id: medication._id
      }
      try {
        await medicationService.deleteMedications(toDelete)
        this.searchedItems = []
        this.medications = []
        this.getMedications()
      } catch (error) {
        console.log(error)
      }
    },

    remove (item) {
      this.removeMedications(item)
    },

    searchOnTable () {
      this.searchedItems = this.medications.filter(item =>
        item.name
          .toString()
          .toLowerCase()
          .includes(this.search.toString().toLowerCase())
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.md-app-content .md-card {
  min-width: 50%;
  height: auto;
}
</style>

<template id="medication-page">
  <div
    v-if="loading">
    <md-progress-spinner
      :md-diameter="100"
      :md-stroke="10"
      md-mode="indeterminate"/>
  </div>
  <div
    v-else>
    <md-table
      v-model="searchedItems"
      md-sort="name"
      md-sort-order="asc"
      md-card
      md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Medicações</h1>
        </div>
        <md-field
          md-clearable
          class="md-toolbar-section-end">
          <md-input
            v-model="search"
            placeholder="Pesquisar por nome..."
            @input="searchOnTable()" />
        </md-field>
      </md-table-toolbar>
      <md-table-empty-state
        :md-description="`Nenhuma medicação com '${search}' encontrada. Tente um novo nome.`"
        md-label="Nenhuma medicação encontrada"/>
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }">
        <md-table-cell
          md-label="Nome"
          md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell
          md-label="Administração"
          md-sort-by="administration">{{ item.administration }}</md-table-cell>
        <md-table-cell
          md-label="Ações">
          <md-button
            class="md-icon-button md-accent"
            @click="remove(item)">
            <md-icon>delete_forever</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>
