<template>
    <div>
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#017bff"
                text-color="white"
                active-text-color="white">
            <el-menu-item route="/new-prescription" index="1">Nova Prescrição</el-menu-item>
            <el-menu-item index="2">Médicos</el-menu-item>
            <el-menu-item index="3">Pacientes</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
    .el-menu-item.is-active {
        font-weight: bold;
    }
</style>