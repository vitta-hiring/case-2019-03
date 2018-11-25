<template>
  <footer class="footer">
    <div>
      <span class="text-muted">&copy; Prescricao medica - {{ new Date() | moment('YYYY') }}</span>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'footer-main'
}
</script>
<style lang="scss" scoped></style>
