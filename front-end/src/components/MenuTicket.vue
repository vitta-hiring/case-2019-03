<template>
  <div v-if="this.$route.meta.toolbar == undefined || this.$route.meta.toolbar == true">
    <div>
      <b-navbar toggleable="lg" type="dark" class="background-navbar">
        <b-navbar-brand href="#">
          <router-link to="/list-prescription">        
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right :no-caret="true" :no-flip="true" class="navbar-items">
              <template slot="button-content">
                <img src="/static/icons/language.svg" alt />
                <span
                  class="uppercase menu-language"
                >{{ this.$store.getters.getLocale || watchLocale }}</span>
              </template>
              <b-dropdown-item href="#" @click="_setLocale('pt-br')" class="f-14-300-gray">
                <div>PT-BR</div>
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item href="#" @click="_setLocale('es')" class="f-14-300-gray">
                <div>ES</div>
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item href="#" @click="_setLocale('en')" class="f-14-300-gray">
                <div>EN</div>
              </b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown
              v-on-clickaway="away"
              id="main-menu"
              right
              :no-caret="false"
              :no-flip="true"
              v-if="this.$store.getters.getShowMainMenus"
            >
              <template slot="button-content">
                <img src="/static/icons/apps.svg" alt />
              </template>
              <div :key="index" v-for="(menu, index) in this.$store.getters.getMainMenus">
                <dropdown-menu
                  :menu="menu"
                  :index="index"
                  :size="returnSizeMainMenu"
                  @eventShowSubMenu="eventShowSubMenu"
                ></dropdown-menu>
              </div>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown
              v-on-clickaway="away"
              id="sub-menu"
              right
              :no-caret="false"
              :no-flip="true"
              v-if="!this.$store.getters.getShowMainMenus"
            >
              <template slot="button-content">
                <img src="/static/icons/apps.svg" alt />
              </template>
              <div :key="index" v-for="(menu, index) in this.$store.getters.getSubMenus">
                <dropdown-menu
                  :menu="menu"
                  :index="index"
                  :size="returnSizeSubMenu"
                  @eventBackToTopMenu="eventBackToTopMenu"
                ></dropdown-menu>
              </div>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right class>
              <div class="fix-width-dropdown-right">
                <img src="/static/icons/boss.svg" class="image-upload-2 inline" />
              </div>
              <div class="fix-width-dropdown-right-2">
                <div class="fa-ul-2 fix-margin-top">
                  <b>{{ this.$store.getters.getUser.displayName }}</b>
                </div>
              </div>
              <b-dropdown-divider></b-dropdown-divider>
              <template slot="button-content">
                <img src="/static/icons/account.svg" alt />
              </template>
              <b-dropdown-item class>
                <router-link
                  tag="div"
                  to="/logout"
                  class="f-14-300-gray"
                >{{ $t('navbar.menu.logout') }}</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import store from "@/backend/store";
import { mixin as clickaway } from "vue-clickaway";
import { directive as onClickaway } from "vue-clickaway";

export default {
  directives: {
    onClickaway: onClickaway
  },

  computed: {
    returnSizeMainMenu() {
      return this.$store.getters.getMainMenusLength
        ? this.$store.getters.getMainMenusLength
        : "";
    },

    returnSizeSubMenu() {
      return this.$store.getters.getSubMenusLength
        ? this.$store.getters.getSubMenusLength
        : "";
    },

    subMenu() {
      return this.showSubMenu ? true : false;
    },

    listRoles() {
      return this.$store.getters.getUser.authorityId
        ? this.$store.getters.getUser.authorityId
        : "";
    },

    watchLocale() {
      return this._getLocale();
    }
  },

  created() {},

  methods: {
    away: function() {
      this.eventBackToTopMenu();
    },

    mounted() {
      document.addEventListener("click", this.close);
    },

    beforeDestroy() {
      document.removeEventListener("click", this.close);
    },

    eventBackToTopMenu() {
      this.showSubMenu = false;
      this.$store.commit("setAmIOnTheMainMenus", true);
      this.$store.commit("setShowMainMenus", true);
      this.toggle = true;
    },

    toggleDropdown(e) {
      this.state = !this.state;
    },

    close(e) {
      if (!this.$el.contains(e.target)) {
        this.state = false;
      }
    },

    eventShowSubMenu(value, children) {
      this.$store.commit("setAmIOnTheMainMenus", false);
      this.toggle = true;
      let subMenus = [];
      this.$store.getters.getMenus.forEach(element => {
        var string = element.rule.stateName,
          substring = children,
          substring2 = ".";
        if (string.includes(substring2)) {
          var new_str = string.substring(0, string.indexOf(substring2));
          if (new_str == children) {
            subMenus.push(element);
          }
        }
      });
      subMenus.length > 0
        ? this.$store.commit("setSubMenus", subMenus)
        : this.$store.commit("setSubMenus", this.empty);
    },

    showMainMenu() {
      document.getElementById("main-menu").style.display = "flex";
    },

    closeMainMenu() {
      document.getElementById("main-menu").style.display = "none";
    },

    showSubMenu() {
      document.getElementById("sub-menu").style.display = "flex";
    },

    closeSubMenu() {
      document.getElementById("sub-menu").style.display = "none";
    }
  },
  data() {
    return {
      state: false,
      toggle: undefined,
      mainMenu: true,
      selectedReports: false,
      sizeMainMenu: this.$store.getters.getRolesLenght,
      empty: [
        {
          id: 0,
          read: true,
          rule: {
            active: true,
            createdAt: null,
            createdBy: "",
            displayName: "",
            id: 0,
            name: "",
            route: "",
            stateName: "",
            updatedAt: null,
            updatedBy: null
          },
          visible: true,
          write: true
        }
      ]
    };
  }
};
</script>

<style scope lang="scss">
@import "../../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";

.background-navbar {
  background-color: #0097a7;
  min-height: 71px;
}

.navbar-logo {
  width: 50px;
  height: 50px;
  margin-top: -10px;
}

.navbar-items:active {
  box-shadow: 0 14px 26px -12px rgba(0, 0, 0, 0.42),
    0 4px 23px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

.show {
  box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.3);
}

.dropdown-menu {
  margin-top: 5px;
}

.dropdown-item {
  padding: 0.25rem 0.8rem;
}

.dropdown-item div {
  width: 100%;
  padding: 5px;
}

.dropdown-item:hover div {
  color: white;
  background-color: #0097a7;
  transition: all 150ms linear;
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.dropdown-item.active,
.dropdown-item:active {
  color: #fff;
  text-decoration: none;
  background-color: white;
}

.menu-language {
  font-size: 10px;
  color: white;
  padding-left: 2px;
}

.fix-width-dropdown-right {
  height: 8.5rem;
}

.fix-width-dropdown-right-2 {
  width: 200px;
  margin-right: 10px;
  padding: 2px 0px 5px 6px;
}

.fix-margin-top {
  margin-top: 20px;
}

.image-upload-2 {
  position: inline;
  margin-left: 2.5rem;
  width: 100%;
  max-width: 10rem;
  height: auto;
  padding: 9px 9px 9px 9px;
}

.fa-ul-2 {
  list-style-type: none;
  // margin-left: 2.5em;
  // padding-left: 0;
  text-align: center;
}

.expand-enter-active,
.expande-leave-active {
  transition: opacity 0.1s;
}

.expande-enter,
.expand-leave-to {
  opacity: 0;
}
</style>
  