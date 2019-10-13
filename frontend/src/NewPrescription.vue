<template>
    <div>
        <el-form ref="prescriptionForm" :model="form" :rules="prescriptionFormRules" labelPosition="top" label-width="200px">

            <h4>Prescriçao de Medicamentos</h4>

            <el-row :gutter="20">
                <el-col :span="12" :xs="24">
                    <el-form-item label="Escolha o Médico" prop="doctor_id">
                        <el-select v-model="form.doctor_id" filterable placeholder="Select">
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
                    <el-form-item label="Escolha o Paciente" prop="patient_id">
                        <el-select v-model="form.patient_id" filterable placeholder="Select">
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
                <el-tab-pane :label="'Med' + (index + 1)" :name="'med' + (index + 1)" v-for="(medicine, index) in form.medicines ">

                    <el-row :gutter="20">

                        <el-col :span="14" :xs="24">
                            <el-form-item label="Medicamento" :required="true">
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
                            <el-form-item label="Via de Administraçao" :required="true">
                                <el-input v-model="medicine.route_of_administration"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-row :gutter="20" :xs="24">

                        <el-col :span="24">
                            <el-form-item label="Posologia" :required="true">
                                <el-input v-model="medicine.dosage" type="textarea" :rows="2"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>

                </el-tab-pane>
            </el-tabs>

            <el-row class="actions-footer">
                <el-col>
                    <el-button type="primary" icon="el-icon-plus" @click="addMedicine">Adicionar Medicamento</el-button>
                    <el-button type="success" icon="el-icon-check" @click="savePrescription">Registrar Prescriçao</el-button>
                </el-col>
            </el-row>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "NewPrescription",
        data() {
            return {
                doctors: [],
                patients: [],
                medicinesFound: [],
                form: {
                    doctor_id: null,
                    patient_id: null,
                    medicines: [
                        {id: null, name: null, route_of_administration: null, dosage: null}
                    ],
                },
                activeMedicine: 'med1',
                prescriptionFormRules: {
                    doctor_id: [
                        { required: true, message: 'Campo obrigatorio', trigger: 'change' }
                    ],
                    patient_id: [
                        { required: true, message: 'Campo obrigatorio', trigger: 'change' }
                    ],
                }
            }
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
                    this.$http.post('/medicines/search', {query})
                        .then(response => this.medicinesFound = response.data)
                }
            },
            addMedicine() {
                this.form.medicines.push({id: null, name: null, route_of_administration: null, dosage: null})
                this.activeMedicine = 'med' + this.form.medicines.length
            },
            fillMedicineInfo(selectedMedicineId, formMedicine) {
                let selectedMedicine = this.medicinesFound.find(medicine => medicine.id === selectedMedicineId);

                formMedicine.id = selectedMedicine.id
                formMedicine.name = selectedMedicine.name
                formMedicine.route_of_administration = selectedMedicine.route_of_administration
            },
            savePrescription() {
                this.$refs['prescriptionForm'].validate((valid) => {
                    if (valid) {
                        this.$http.post('/prescription', this.form)
                    }
                });
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
        margin-bottom: 5px;
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
</style>