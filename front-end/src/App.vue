<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

    import {storageKey} from './constants/keys';
    import initialState from './constants/initialState';

    export default {
        created() {
            localStorage.setItem(storageKey, JSON.stringify(initialState));
        }
    };

</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #2c3e50;
    }
</style>
