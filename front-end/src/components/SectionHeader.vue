<template>
    <div class="section__header">
        <h2 class="section__title">{{title}}</h2>
        <div class="section__actions">
            <router-link v-for="item in actions" v-bind:key="item.to" :to="item.to">{{item.label}}</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SectionHeader",
        props: {
            title: String,
            actions: Array
        }
    }
</script>
