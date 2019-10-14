<template>
  <div>
    <el-alert
        v-if="warnings"
        title="Alerta de interaçao medicamentosa"
        type="warning"
        description="A prescriçao nao podera ser salva."
        show-icon>
    </el-alert>

    <template v-if="warnings" v-for="interaction in drugsInteraction">
      <div class="table-interactions">
        <el-row :gutter="5">
          <el-col :span="8"><b>Farmaco 1</b> <br> {{ interaction.pharmacon_1 }}</el-col>
          <el-col :span="8"><b>Farmaco 2</b> <br> {{ interaction.pharmacon_2 }}</el-col>
          <el-col :span="8"><b>Risco</b>  <br> {{ interaction.risk_level }}</el-col>
        </el-row>
        <el-row>
          <el-col><b>Descricao:</b> {{ interaction.description }}</el-col>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
    export default {
        name: 'AlertDrugInteraction',
        props: ["warnings", "drugsInteraction"],
    }
</script>

<style>
  .table-interactions {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .table-interactions .el-row {
    margin-bottom: 10px;
    font-size: 12px;
  }
</style>
