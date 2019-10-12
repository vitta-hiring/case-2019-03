<template>
    <div>
        <el-form ref="form" :model="form" labelPosition="top">
            <el-form-item label="Escolha o Médico">
                <el-select v-model="form.doctor" filterable placeholder="Select">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Escolha o Paciente">
                <el-select v-model="form.patient" filterable placeholder="Select">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>


        </el-form>
    </div>
</template>

<script>
    export default {
        name: "NewPrescription",
        data() {
            return {
                options: [{
                    value: 'Option1',
                    label: 'Option1'
                }, {
                    value: 'Option2',
                    label: 'Option2'
                }, {
                    value: 'Option3',
                    label: 'Option3'
                }, {
                    value: 'Option4',
                    label: 'Option4'
                }, {
                    value: 'Option5',
                    label: 'Option5'
                }],
                form: {
                    doctor: '',
                    patient: ''
                }
            }
        }
    }
</script>