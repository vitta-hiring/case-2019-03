<template>
    <div>
        <el-table
            :data="prescriptions"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">

                    <p><b>Médico:</b> {{ props.row.doctor.name }}</p>

                    <el-card class="box-card" v-for="medicine in props.row.medicines">
                        <p><b>Medicamento:</b> {{ medicine.medicine.name }}</p>
                        <p><b>Via de Administração:</b> {{ medicine.route_of_administration }}</p>
                        <p><b>Posologia:</b> {{ medicine.dosage }}</p>
                    </el-card>

                </template>
            </el-table-column>
            <el-table-column
                label="Data"
                prop="created_at"
                width="200">
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

<style>
    .el-table__expanded-cell[class*=cell] {
        padding: 10px;
    }

    .el-card {
        margin-bottom: 15px;
    }

    .el-card__body {
        padding: 10px 20px;
        color: #666;
    }
</style>
