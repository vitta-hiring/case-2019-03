<template>
    <vi-wrapper class="section__header" no-spacing align-items="center" justify-content="space-between">
        <h2 class="section__title">{{title}}</h2>
        <div class="section__actions">
            <vi-button v-for="item in actions" :key="item.to" @click="navigateTo(item.to)" small primary><vi-icon v-if="item.icon" :name="item.icon" />{{item.label}}</vi-button>
        </div>
    </vi-wrapper>
</template>

<script>
    export default {
        name: "SectionHeader",
        props: {
            title: String,
            actions: Array
        },
        methods: {
            navigateTo(route) {
                this.$router.push(route);
            }
        }
    }
</script>
