<template>
  <div id="app">
    <!-- <loading :active.sync="visible" :can-cancel="true"></loading> -->
    <SpinnerLoader v-if="this.$store.getters.getLoading"></SpinnerLoader>
    <!-- for example router view -->
    <menu-ticket v-if="this.$store.getters.getLogin"></menu-ticket>
    <sidebar-ticket v-else-if="!this.$store.getters.getLogin"></sidebar-ticket> 
    <router-view :key="$route.fullPath"></router-view>
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import SpinnerLoader from "./components/Spinner";
export default {
  components: {
    SpinnerLoader,
  },
  mounted() {
    this.$Progress.finish();

    if (window.top !== window.self) {
      this.$store.commit("setLogin", false);
    } else {
      if (this.$route.path === "/login") {
        this.$store.commit("setLogin", false);
      } else {
        this.$store.commit("setLogin", true);
      }
    }
  },
  created() {

    this._getLocale();
    this.$validator.localize(this.$store.getters.getUser.locale);
    this.$moment.locale(this.$store.getters.getUser.locale);
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        // parse meta tags
        this.$Progress.parseMeta(meta);
      }
      //  start the progress bar
      this.$Progress.start();
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish();
    });
  },
  data() {
    return {
      navbar: false
    }

  }
};
</script>

<style>
@import "./assets/css/roboto.css";
@import "./assets/fontawesome/css/all.css";

#app {
  font-family: Roboto;
}
</style>
