<template>
    <div>
        <el-form
            :model="form"
            ref="prescriptionForm"
            labelPosition="top"
            label-width="200px">

            <h4>Prescrição de Medicamentos</h4>

            <el-row :gutter="20">
                <el-col :span="12" :xs="24">
                    <el-form-item
                        label="Escolha o Médico"
                        prop="doctor_id"
                        :rules="{required: true, message: 'Campo obrigatório', trigger: 'change'}">
                        <el-select
                            v-model="form.doctor_id"
                            filterable
                            placeholder="Select">
                            <el-option
                                v-for="item in doctors"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12" :xs="24">
                    <el-form-item
                        label="Escolha o Paciente"
                        prop="patient_id"
                        :rules="{required: true, message: 'Campo obrigatório', trigger: 'change'}">
                        <el-select
                            v-model="form.patient_id"
                            filterable
                            placeholder="Select">
                            <el-option
                                v-for="item in patients"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <h4>Lista de Medicamentos</h4>

            <el-tabs v-model="activeMedicine">
                <el-tab-pane
                    :label="tabName(index)"
                    :name="tabName(index)"
                    v-for="(medicine, index) in form.medicines"
                    :key="index">

                    <el-row :gutter="20">

                        <el-col :span="14" :xs="24">
                            <el-form-item
                                label="Medicamento"
                                :prop="'medicines.' + index + '.id'"
                                :rules="{required: true, message: 'Campo obrigatório', trigger: 'blur'}">
                                <el-select
                                    v-model="medicine.id"
                                    filterable
                                    remote
                                    :remote-method="searchMedicines"
                                    placeholder="Digite um trecho do nome do medicamento"
                                    @change="fillMedicineInfo($event, medicine)">
                                    <el-option
                                        v-for="item in medicinesFound"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="10" :xs="24">
                            <el-form-item
                                label="Via de Administraçao"
                                :prop="'medicines.' + index + '.route_of_administration'"
                                :rules="{required: true, message: 'Campo obrigatório', trigger: 'blur'}">
                                <el-input v-model="medicine.route_of_administration"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-row :gutter="20" :xs="24">

                        <el-col :span="24">
                            <el-form-item
                                label="Posologia"
                                :prop="'medicines.' + index + '.dosage'"
                                :rules="{required: true, message: 'Campo obrigatório', trigger: 'blur'}">
                                <el-input
                                    v-model="medicine.dosage"
                                    type="textarea"
                                    :rows="2"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-link
                        type="danger"
                        class="btn-remove-medicine"
                        @click="removeMedicine(index)">
                        Remover este medicamento</el-link>

                </el-tab-pane>
            </el-tabs>

            <AlertDrugInteration :warnings="warnings" :drugsInteraction="drugsInteraction" />

            <el-row class="actions-footer">
                <el-col>
                    <el-button
                        type="primary"
                        icon="el-icon-plus"
                        @click="addMedicine">
                        Medicamento
                    </el-button>

                    <el-button
                        type="success"
                        icon="el-icon-check"
                        @click="savePrescription">Registrar Prescrição
                    </el-button>
                </el-col>
            </el-row>

        </el-form>
    </div>
</template>

<script>
import AlertDrugInteration from '../components/AlertDrugInteraction'

export default {
  name: 'NewPrescription',
  data() {
    return {
      doctors: [],
      patients: [],
      medicinesFound: [],
      medicinesInUse: [],
      form: {
        doctor_id: null,
        patient_id: null,
        medicines: [
          { id: null, name: null, route_of_administration: null, dosage: null }
        ]
      },
      activeMedicine: 'Med1',
      warnings: false,
      drugsInteraction: []
    }
  },
  components: {
    AlertDrugInteration
  },
  mounted() {
    this.getDoctors()
    this.getPatients()
  },
  methods: {
    async getDoctors() {
      this.$http.get('/doctors')
        .then(response => this.doctors = response.data)
    },
    async getPatients() {
      this.$http.get('/patients')
        .then(response => this.patients = response.data)
    },
    async searchMedicines(query) {
      if (query !== '') {
        this.$http.post('/medicines/search', { query })
          .then(response => {
            this.medicinesFound = response.data.concat(this.medicinesInUse)
          })
      }
    },
    addMedicine() {
      this.form.medicines.push({ id: null, name: null, route_of_administration: null, dosage: null })
      this.activeMedicine = 'Med' + this.form.medicines.length
    },
    fillMedicineInfo(selectedMedicineId, formMedicine) {
      const selectedMedicine = this.medicinesFound.find(medicine => medicine.id === selectedMedicineId)

      this.medicinesInUse.push(selectedMedicine)

      formMedicine.id = selectedMedicine.id
      formMedicine.name = selectedMedicine.name
      formMedicine.route_of_administration = selectedMedicine.route_of_administration
    },
    savePrescription() {
      this.$refs.prescriptionForm.validate((valid) => {
        if (valid) {
          this.$http.post('/prescriptions', this.form).then((response) => {
            if (response.data.warnings === true) {
              this.warnings = response.data.warnings
              this.drugsInteraction = response.data.drugsInteraction
            } else {
              this.$message({
                message: 'Prescrição cadastrada com sucesso',
                type: 'success'
              })
              this.clearForm()
            }
          })
        } else {
          this.$message({
            message: 'Todos os campos, inclusive de medicamentos, são obrigatórios',
            type: 'warning'
          })
        }
      })
    },
    tabName(index) {
      return 'Med' + (index + 1)
    },
    removeMedicine(index) {
      if (this.form.medicines.length > 1) {
        this.$confirm('Deseja remover este medicamento da prescrição?', 'Atenção!', {
          confirmButtonText: 'Sim, remover',
          cancelButtonText: 'Cancelar',
          type: 'error'
        }).then(() => {
          if (this.form.medicines.length - 1 === index) this.activeMedicine = 'Med' + index

          this.$delete(this.form.medicines, index)

          this.$message({
            type: 'success',
            message: 'Medicamento removido'
          })
        })
      } else {
        this.$message({
          message: 'Não é possível remover o único medicamento',
          type: 'info'
        })
      }
    },
    clearForm() {
      this.medicinesFound = []
      this.activeMedicine = 'Med1'
      this.warnings = false
      this.drugsInteraction = []

      this.form = {
        doctor_id: null,
        patient_id: null,
        medicines: [
          { id: null, name: null, route_of_administration: null, dosage: null }
        ]
      }

      this.$refs.prescriptionForm.resetFields()
    }
  }
}
</script>

<style>
    h4 {
        margin-bottom: 4px;
    }

    .el-form {
        margin-top: 30px;
    }

    .el-form-item {
        margin-bottom: 15px;
    }

    .el-select {
        width: 100%;
    }

    .el-form--label-top .el-form-item__label {
        padding: 0;
    }

    div {
        text-align: left;
    }

    .actions-footer {
        margin-top: 20px;
    }

    .btn-remove-medicine {
        margin-top: 15px;
    }
</style>
