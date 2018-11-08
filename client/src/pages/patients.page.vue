<script>
import patientService from './../services/patients.service'
import moment from 'moment'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'PatientsPage',

  mixins: [validationMixin],

  data: () => ({
    patients: [],
    search: null,
    searchedItems: [],
    isEdit: false,
    isNew: false,
    patientId: null,
    form: {
      name: null
    }
  }),

  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      }
    }
  },

  mounted: function () {
    this.patients = []
    this.getPatients()
    this.searchedItems = this.patients
  },

  methods: {
    async getPatients () {
      try {
        this.searchedItems = []
        this.patients = []
        const array = await patientService.getPatients()
        array.data.map(item => {
          item.date_of_birth = moment(item.date_of_birth).format('MM/DD/YYYY')
          this.patients.push(item)
        })
        this.searchedItems = this.patients
        this.close()
      } catch (error) {
        console.log(error)
      }
    },

    async removePatients (patient) {
      const toDelete = {
        id: patient._id
      }
      try {
        await patientService.deletePatients(toDelete)
        this.searchedItems = []
        this.patients = []
        this.getPatients()
      } catch (error) {
        console.log(error)
      }
    },

    edit (item) {
      this.form.name = item.name
      this.isEdit = true
      this.isNew = false
      this.patientId = item._id
    },

    async editPatients () {
      const toEdit = {
        name: this.form.name
      }
      try {
        await patientService.putPatients(toEdit, this.patientId)
        this.getPatients()
      } catch (error) {
        console.log(error)
      }
    },

    async postPatients () {
      const obj = {
        name: this.form.name,
        date_of_birth: moment().format('MM/DD/YYYY'),
        gender: 'Masculino'
      }
      try {
        await patientService.postPatients(obj)
        this.getPatients()
      } catch (error) {
        console.log(error)
      }
    },

    remove (item) {
      this.removePatients(item)
    },

    newPatient () {
      this.isNew = true
      this.isEdit = false
      this.clearForm()
    },

    searchOnTable () {
      this.searchedItems = this.patients.filter(item =>
        item.name
          .toString()
          .toLowerCase()
          .includes(this.search.toString().toLowerCase())
      )
    },

    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },

    close () {
      this.isEdit = false
      this.isNew = false
    },

    clearForm () {
      this.$v.$reset()
      this.form.name = null
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

<template id="patient-page">
  <div class="md-layout md-gutter md-alignment-center-space-around">
    <div
      v-if="isEdit || isNew"
      class="md-layout-item md-size-50">
      <h1
        v-if="isEdit && !isNew"
        class="md-title">Editar</h1>
      <h1
        v-if="isNew && !isEdit">
        Adicionar paciente</h1>
      <form
        novalidate
        class="md-layout"
        @submit="edit()">
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field :class="getValidationClass('name')">
              <label for="name">Nome</label>
              <md-input
                id="name"
                v-model="form.name"
                name="name"/>
              <span
                v-if="!$v.form.name.required"
                class="md-error">Campo obrigatório!</span>
              <span
                v-else-if="!$v.form.name.minlength"
                class="md-error">Nome inválido</span>
            </md-field>
            <div class="md-layout">
              <md-button
                class="md-accent md-layout-item"
                @click="close()">Cancelar</md-button>
              <md-button
                v-if="isEdit && !isNew"
                class="md-primary md-layout-item"
                @click="editPatients()">Salvar</md-button>
              <md-button
                v-if="isNew && !isEdit"
                class="md-primary md-layout-item"
                @click="postPatients()">Salvar</md-button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <md-table
      v-else
      v-model="searchedItems"
      md-sort="name"
      md-sort-order="asc"
      md-card
      md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Pacientes</h1>
        </div>
        <md-field
          md-clearable
          class="md-toolbar-section-end">
          <md-input
            v-model="search"
            placeholder="Pesquisar por nome..."
            @input="searchOnTable()" />
        </md-field>
        <div class="md-layout">
          <md-button
            md-fab-bottom-right
            class="md-fab md-mini md-primary"
            @click="newPatient()">
            <md-icon>add</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-empty-state
        :md-description="`Nenhum paciente com '${search}' encontrado. Tente um novo nome ou crie um novo paciente.`"
        md-label="Nenhum paciente encontrado">
        <md-button
          class="md-primary md-raised"
          @click="newPatient()">Criar novo Paciente</md-button>
      </md-table-empty-state>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }">
        <md-table-cell
          md-label="Nome"
          md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell
          md-label="Gênero"
          md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell
          md-label="Data de nascimento"
          md-sort-by="date_of_birth">{{ item.date_of_birth }}</md-table-cell>
        <md-table-cell
          md-label="Ações">
          <md-button
            class="md-icon-button md-primary"
            @click="edit(item)">
            <md-icon>edit</md-icon>
          </md-button>
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
