<template>
    <div>
        <el-table
            :data="prescriptions"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">

                    <el-table
                        :data="props.row.medicines"
                        style="width: 100%"
                        size="mini">
                        <el-table-column
                            prop="medicine.name"
                            label="Medicamento"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="route_of_administration"
                            label="Via"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="dosage"
                            label="Posologia">
                        </el-table-column>
                    </el-table>

                </template>
            </el-table-column>
            <el-table-column
                label="Data"
                prop="created_at">
            </el-table-column>
            <el-table-column
                label="Medico"
                prop="doctor.name">
            </el-table-column>
            <el-table-column
                label="Paciente"
                prop="patient.name">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: 'Prescriptions',
  data() {
    return {
        prescriptions: []
    }
  },
  mounted() {
    this.getPrescriptions()
  },
  methods: {
    getPrescriptions () {
        this.$http.get('/prescriptions')
            .then(response => this.prescriptions = response.data)
    }
  }
}
</script>
