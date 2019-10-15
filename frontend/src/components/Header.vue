<template>
    <div>
        <el-menu
                :default-active="activeIndex"
                mode="horizontal"
                background-color="#017bff"
                text-color="white"
                active-text-color="white"
                :router="true">
            <el-menu-item index="new-prescription">Nova Prescrição</el-menu-item>
            <el-menu-item index="prescriptions">Historico de Prescriçoes</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      activeIndex: 'new-prescription'
    }
  }
}
</script>

<style>
    .el-menu-item.is-active {
        font-weight: bold;
    }
</style>
