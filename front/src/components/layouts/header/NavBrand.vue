<template>
  <div class="navbar-header">
    <a href="/" class="navbar-brand">Medical Health</a>
    <button
      class="navbar-toggle"
      type="button"
      @click.prevent="toggleNavBarCollapse">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
  </div>
</template>
<script>
export default {
  name: 'header-nav-brand',
  methods: {
    toggleNavBarCollapse () {
      this.$emit('navBarCollapseAction')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
