<template>
    <vi-wrapper grid class="grey">
        <router-view/>
    </vi-wrapper>
</template>

<script>

    import {storageKey} from './constants/keys';

    export default {
        created() {
            localStorage.setItem(storageKey, JSON.stringify({}));
        }
    };

</script>

<style scoped>
    .grey {
        background: #E4E4E4;
    }
</style>