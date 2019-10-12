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
            <el-menu-item index="doctors">Médicos</el-menu-item>
            <el-menu-item index="patients">Pacientes</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                activeIndex: 'new-prescription',
            };
        },
        methods: {
        }
    }
</script>

<style>
    .el-menu-item.is-active {
        font-weight: bold;
    }
</style>