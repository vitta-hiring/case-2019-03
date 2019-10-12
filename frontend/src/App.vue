<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from "./Header";

    export default {
        name: "App",
        methods: {},
        components: {
            Header
        }
    }
</script>

<style>
    #app {
        font-family: Helvetica, sans-serif;
        text-align: center;
    }
</style>
