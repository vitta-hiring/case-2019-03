<template>
  <div id="app">
    <header-panel v-if="this.$route.name != 'Login'"></header-panel>
    <notifications group="foo" />
    <router-view class="container"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: { }
}
</script>

<style lang="scss">
@import './assets/styles/custom.scss';
</style>
