<template>
  <img v-if="name && src" :style="style" class="padding-5-l" :src="src" />
</template>

<script>
export default {
  computed: {
    src() {
      return "/static/icons/" + this.name + ".svg";
    },
    style() {
      let value = "";
      this.widthValue
        ? (value = "width:" + this.widthValue + "px;")
        : (value = "width: 32px;");
      this.marginTopValue
        ? (value = value + "margin-top:" + this.marginTopValue + "rem;")
        : (value = value + "margin-top: 0rem;");
      this.marginLeftValue
        ? (value = value + "margin-left:" + this.marginLeftValue + "rem;")
        : (value = value + "margin-left: 0rem;");
      return value;
    }
  },

  props: {
    name: {
      type: String
    },
    widthValue: {
      type: String
    },
    marginTopValue: {
      type: String
    },
    marginLeftValue: {
      type: String
    }
  }
};
</script>

<style <style scoped>
.icon-position {
  margin-top: 0rem;
  margin-left: 0rem;
  /* margin-right: -2.3rem; */
  margin-right: 0rem;
}

.icon-size {
  width: 32px;
  cursor: pointer;
}
</style>