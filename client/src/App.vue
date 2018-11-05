<template>
  <div id="app">
    <master-page/>
  </div>
</template>

<script>
import MasterPage from './pages/master.page.vue'
export default {
  name: 'MainAppPage',

  components: {
    MasterPage
  }
}
</script>

<style lang='scss' scoped>
#app {
  background-color: rgba(211, 211, 211, 0.383);
  height: 100vh;
}
</style>
