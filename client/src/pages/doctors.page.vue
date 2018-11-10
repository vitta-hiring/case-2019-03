<script>
import doctorService from './../services/doctors.service'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'DoctorsPage',

  mixins: [validationMixin],

  data: () => ({
    doctors: [],
    search: null,
    searchedItems: [],
    isEdit: false,
    isNew: false,
    doctorId: null,
    form: {
      name: null,
      medical_speciality: null,
      hospital: null
    }
  }),

  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      medical_speciality: {
        required,
        minLength: minLength(3)
      },
      hospital: {
        required,
        minLength: minLength(3)
      }
    }
  },

  mounted: function () {
    this.doctors = []
    this.getDoctors()
    this.searchedItems = this.doctors
  },

  methods: {
    async getDoctors () {
      try {
        this.searchedItems = []
        this.doctors = []
        const array = await doctorService.getDoctors()
        array.data.map(item => {
          this.doctors.push(item)
        })
        this.searchedItems = this.doctors
        this.close()
      } catch (error) {
        console.log(error)
      }
    },

    async removeDoctors (doctor) {
      const toDelete = {
        id: doctor._id
      }
      try {
        await doctorService.deleteDoctors(toDelete)
        this.searchedItems = []
        this.doctors = []
        this.getDoctors()
      } catch (error) {
        console.log(error)
      }
    },

    edit (item) {
      this.form.name = item.name
      this.isEdit = true
      this.isNew = false
      this.doctorId = item._id
    },

    async editDoctors () {
      const toEdit = {
        name: this.form.name
      }
      try {
        await doctorService.putDoctors(toEdit, this.doctorId)
        this.getDoctors()
      } catch (error) {
        console.log(error)
      }
    },

    async postDoctors () {
      const obj = {
        name: this.form.name,
        medical_speciality: this.form.medical_speciality,
        hospital: this.form.hospital
      }
      try {
        await doctorService.postDoctors(obj)
        this.getDoctors()
      } catch (error) {
        console.log(error)
      }
    },

    remove (item) {
      this.removeDoctors(item)
    },

    newDoctor () {
      this.isNew = true
      this.isEdit = false
      this.clearForm()
    },

    searchOnTable () {
      this.searchedItems = this.doctors.filter(item =>
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
      this.form.medical_speciality = null
      this.form.hospital = null
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

<template id="doctor-page">
  <div class="md-layout md-gutter md-alignment-center-space-around">
    <div
      v-if="isEdit || isNew"
      class="md-layout-item md-size-50">
      <h1
        v-if="isEdit && !isNew"
        class="md-title">Editar</h1>
      <h1
        v-if="isNew && !isEdit">
        Adicionar médico</h1>
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
            <md-field :class="getValidationClass('medical_speciality')">
              <label for="medical_speciality">Especialidade medica</label>
              <md-input
                id="medical_speciality"
                v-model="form.medical_speciality"
                name="medical_speciality"/>
              <span
                v-if="!$v.form.medical_speciality.required"
                class="md-error">Campo obrigatório!</span>
              <span
                v-else-if="!$v.form.medical_speciality.minlength"
                class="md-error">Especialidade médica inválida</span>
            </md-field>
            <md-field :class="getValidationClass('hospital')">
              <label for="hospital">Hospital</label>
              <md-input
                id="hospital"
                v-model="form.hospital"
                name="hospital"/>
              <span
                v-if="!$v.form.hospital.required"
                class="md-error">Campo obrigatório!</span>
              <span
                v-else-if="!$v.form.hospital.minlength"
                class="md-error">Hospital inválido</span>
            </md-field>
            <div class="md-layout">
              <md-button
                class="md-accent md-layout-item"
                @click="close()">Cancelar</md-button>
              <md-button
                v-if="isEdit && !isNew"
                class="md-primary md-layout-item"
                @click="editDoctors()">Salvar</md-button>
              <md-button
                v-if="isNew && !isEdit"
                class="md-primary md-layout-item"
                @click="postDoctors()">Salvar</md-button>
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
          <h1 class="md-title">Médicos</h1>
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
            @click="newDoctor()">
            <md-icon>add</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-empty-state
        :md-description="`Nenhum médico com '${search}' encontrado. Tente um novo nome ou crie um novo médico.`"
        md-label="Nenhum médico encontrado">
        <md-button
          class="md-primary md-raised"
          @click="newDoctor()">Criar novo Médico</md-button>
      </md-table-empty-state>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }">
        <md-table-cell
          md-label="Nome"
          md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell
          md-label="Hospital"
          md-sort-by="hospital">{{ item.hospital }}</md-table-cell>
        <md-table-cell
          md-label="Especialidade"
          md-sort-by="medical_speciality">{{ item.medical_speciality }}</md-table-cell>
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
