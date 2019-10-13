<template>
    <div>
        <el-form ref="form" :model="form" labelPosition="left" label-width="200px">
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

        </el-form>
    </div>
</template>

<style>
    .el-form {
        margin-top: 30px;
    }

    div {
        text-align: left;
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