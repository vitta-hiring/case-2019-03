<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <div class="navbar-minimize">
        <button
          class="btn btn-outline btn-fill btn-round btn-icon d-none d-lg-block"
          @click="minimizeSidebar"
        >
          <i :class="$sidebar.isMinimized ? 'fa fa-ellipsis-v' : 'fa fa-navicon'"></i>
        </button>
      </div>
      <a class="navbar-brand">{{this.$route.name}}</a>
      <button
        type="button"
        class="navbar-toggler navbar-toggler-right"
        :class="{toggled: $sidebar.showSidebar}"
        aria-expanded="false"
        @click="toggleSidebar"
      >
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="nav navbar-nav mr-auto">
          <form class="navbar-form navbar-left navbar-search-form" role="search">
            <!-- <div class="input-group">
              <label for="searchInput"></label>
              <i class="nc-icon nc-zoom-split"></i>
              <input id="searchInput" type="text" value="" class="form-control" placeholder="Search...">
            </div>-->
          </form>
        </ul>
        <ul class="navbar-nav">
          <!-- <drop-down>
            <i slot="title" class="nc-icon nc-planet"></i>
            <v-icon name="comment" flip="horizontal"/>
            <a class="dropdown-item" href="#">Create New Post</a>
            <a class="dropdown-item" href="#">Manage Something</a>
            <a class="dropdown-item" href="#">Do Nothing</a>
            <a class="dropdown-item" href="#">Submit to live</a>
            <li class="divider"></li>
            <a class="dropdown-item" href="#">Another action</a>
          </drop-down>-->
          <!-- <drop-down>
            <template slot="title">
              <i class="nc-icon nc-bell-55"></i>
              <span class="notification">5</span>
              <span class="d-lg-none">Notification</span>
            </template>
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </drop-down>-->
          <!-- <drop-down position="right" :icon="genre">
            <a href="#" class="dropdown-item text-danger" @click.stop="logout()">
              <i class="nc-icon nc-button-power"></i> Sair
            </a>
          </drop-down> -->
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import User from "../../backend/models/User.js";
export default {
  beforeCreate() {    
  },
  created() {
    User.me()
      .then(s => {
        this.genre =
          s.data.genre == "male"
            ? "male"
            : s.data.genre == "female"
            ? "female"
            : null;
      })
      .catch(e => {
        return null;
      });
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false,
      genre: "male"
    };
  },
  methods: {
    logout() {
      this.$router.push({ name: "Login" });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    minimizeSidebar() {
      this.$sidebar.toggleMinimize();
    }
  }
};
</script>
<style>
</style>
