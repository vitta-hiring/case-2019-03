<script>
import interactionService from './../services/interactions.service'

export default {
  name: 'InteractionsPage',

  data: () => ({
    interactions: [],
    search: null,
    searchedItems: [],
    interactionId: null,
    loading: true
  }),

  mounted: function () {
    this.interactions = []
    this.getInteractions()
    this.searchedItems = this.interactions
  },

  methods: {
    async getInteractions () {
      try {
        this.searchedItems = []
        this.interactions = []
        const array = await interactionService.getInteractions()
        array.data.map(item => {
          item.first_active_principle.toLowerCase()
          item.seccond_active_principle.toLowerCase()
          this.interactions.push(item)
        })
        this.searchedItems = this.interactions
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },

    searchOnTable () {
      this.searchedItems = this.interactions.filter(item =>
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

.md-dialog {
  max-width: 768px;
}
</style>

<template id="interaction-page">
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
          <h1 class="md-title">Interações medicamentosas</h1>
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
          md-label="Ativo 1"
          md-sort-by="first_active_principle">{{ item.first_active_principle }}</md-table-cell>
        <md-table-cell
          md-label="Ativo 2"
          md-sort-by="seccond_active_principle">{{ item.seccond_active_principle }}</md-table-cell>
        <md-table-cell
          md-label="Descrição"
          md-sort-by="description">{{ item.description }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>

</template>
