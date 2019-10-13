<template>
    <div>
        <el-form ref="form" :model="form" labelPosition="top" label-width="200px">

            <h4>Prescriçao de Medicamentos</h4>

            <el-row :gutter="20">
                <el-col :span="12" :xs="24">
                    <el-form-item label="Escolha o Médico">
                        <el-select v-model="form.doctor" filterable placeholder="Select">
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
                    <el-form-item label="Escolha o Paciente">
                        <el-select v-model="form.patient" filterable placeholder="Select">
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

            <el-row :gutter="20">

                <el-col :span="14" :xs="24">
                    <el-form-item label="Medicamento">
                        <el-select value="med_1">
                            <el-option label="Meicamento 1" value="med_1"></el-option>
                            <el-option label="Meicamento 2" value="med_2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="10" :xs="24">
                    <el-form-item label="Via de Administraçao">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row :gutter="20" :xs="24">

                <el-col :span="24">
                    <el-form-item label="Posologia">
                        <el-input type="textarea" :rows="2"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-row class="actions-footer">
                <el-col>
                    <el-button type="primary" icon="el-icon-plus">Adicionar Medicamento</el-button>
                    <el-button type="success" icon="el-icon-check">Registrar Prescriçao</el-button>
                </el-col>
            </el-row>

        </el-form>
    </div>
</template>

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

<script>
    export default {
        name: "NewPrescription",
        data() {
            return {
                doctors: [],
                patients: [],
                form: {
                    doctor: '',
                    patient: ''
                }
            }
        },
        mounted() {
            this.getDoctors()
            this.getPatients()
        },
        methods: {
            async getDoctors() {
                let response = await this.$http.get('/doctors')
                this.doctors = response.data
            },
            async getPatients() {
                let response = await this.$http.get('/patients');
                this.patients = response.data
            }
        }
    }
</script>