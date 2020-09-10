<template>
  <div v-if="this.$route.meta.toolbar == undefined || this.$route.meta.toolbar == true">
    <div id="ticket-menu" class="sidebar" v-if="!toggle">
      <img class="icon-next" @click="openMenu" src="/static/icons/baseline-navigate_next.svg" />
    </div>
    <div v-if="toggle">
      <div
        @click="closeMenu"
        v-if="mainMenu && _isAdmin()"
        :class="{'close-sidebar-some-menus': noSubmenus, 'close-sidebar': fullHD, 'close-sidebar-hd': HD && !newResolution,   
        'close-sidebar-new-resolution': newResolution      
        }"
      >
        <img class="icon-before" src="/static/icons/baseline-navigate_before.svg" />
      </div>
      <div class="close-sidebar-agent" @click="closeMenu" v-else-if="mainMenu && _isAgent()">
        <img class="icon-before" src="/static/icons/baseline-navigate_before.svg" />
      </div>
      <transition name="expand">
        <!-- <b-nav-item-dropdown> -->
        <div class="menu">
          <div v-on-clickaway="away" v-if="this.$store.getters.getShowMainMenus">
            <div :key="index" v-for="(menu, index) in this.$store.getters.getMainMenus">
              <sidebar-menu
                :menu="menu"
                :index="index"
                :size="returnSizeMainMenu"
                @eventCloseMainMenu="eventCloseMainMenu"
                @eventShowSubMenu="eventShowSubMenu"
              ></sidebar-menu>
            </div>
          </div>
          <div v-on-clickaway="away" v-if="!this.$store.getters.getShowMainMenus">
            <div :key="index" v-for="(menu, index) in this.$store.getters.getSubMenus">
              <sidebar-menu
                :menu="menu"
                :index="index"
                :size="returnSizeSubMenu"
                @eventCloseMainMenu="eventCloseMainMenu"
                @eventBackToTopMenu="eventBackToTopMenu"
              ></sidebar-menu>
            </div>
          </div>
        </div>
        <!-- </b-nav-item-dropdown> -->
      </transition>
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

  created() {
    if (window.innerHeight == "582" || window.innerHeight == "657") {
      this.newResolution = true;
    }
    this.$store.commit("setShowMainMenus", true);

    // if (window.innerHeight == "550") {
    // }
    // if (window.innerHeight == "768") {
    // }
    // if (window.innerHeight == "1005" || window.innerHeight == "1080") {
    // }

    if (window.innerWidth > 1370) {
      this.fullHD = true;
    } else {
      this.HD = true;
    }
  },

  computed: {
    returnSizeMainMenu() {
      this.$store.getters.getMainMenusLength
        ? this.$store.getters.getMainMenusLength < 3
          ? (this.noSubmenus = true)
          : ""
        : "";
      return this.$store.getters.getMainMenusLength
        ? this.$store.getters.getMainMenusLength
        : "";
    },

    returnSizeSubMenu() {
      this.$store.getters.getMainMenusLength
        ? this.$store.getters.getMainMenusLength < 3
          ? (this.noSubmenus = true)
          : ""
        : "";
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

  methods: {
    eventCloseMainMenu() {
      this.toggle = false;
    },

    away: function() {
      this.toggle = false;
      this.showSubMenu = false;
      this.$store.commit("setShowMainMenus", true);
      this.$store.commit("setAmIOnTheMainMenus", true);
      this.$store.commit("setShowMainMenus", true);
      this.noSubmenus = undefined;
    },

    eventBackToTopMenu() {
      this.showSubMenu = false;
      this.$store.commit("setAmIOnTheMainMenus", true);
      this.$store.commit("setShowMainMenus", true);
      this.noSubmenus = undefined;
    },

    eventShowSubMenu(value, children) {
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
        : this.$store.commit("setSubMenus", this.empty),
        (this.noSubmenus = true);
      this.showSubMenu = value;
      this.showSubMenu == false ? (this.showSubMenu = true) : "";
      this.showSubMenu
        ? this.$store.commit("setAmIOnTheMainMenus", false)
        : this.$store.commit("setAmIOnTheMainMenus", true);
    },

    clearMenu() {
      this.mainMenu = true;
      this.showSubMenu = false;
      this.selectedReports = false;
    },

    openMenu() {
      this.toggle = true;
      document.getElementById("ticket-menu").style.display = "none";
    },

    closeMenu() {
      this.toggle = false;
      document.getElementById("ticket-menu").style.display = "flex";
    },

    backMenu() {
      this.mainMenu = true;
      this.selectedReports = false;
    },

    selectReports() {
      this.mainMenu = false;
      this.selectedReports = true;
    },

    openMenu() {
      this.toggle = true;
    },

    closeMenu() {
      this.toggle = false;
    },

    backMenu() {
      this.mainMenu = true;
      this.selectedReports = false;
    }
  },
  data() {
    return {
      newResolution: undefined,
      HD: undefined,
      fullHD: undefined,
      // size: this.$store.getters.getSelectedReports.length,
      noSubmenus: undefined,
      toggle: false,
      mainMenu: true,
      selectedReports: false,
      sizeMainMenu: this.$store.getters.getRolesLenght,
      showSubMenu: false,
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

<style scoped>
@import "../../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";

.sidebar-item-menu div {
  width: 100%;
  padding: 15px;
}

.sidebar-item-menu:hover div {
  color: white;
  background-color: #0097a7;
  transition: all 150ms linear;
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.sidebar-item-submenu:hover div {
  color: white;
  background-color: #0097a7;
  transition: all 150ms linear;
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.sidebar-item-menu.active,
.sidebar-item-menu:active {
  color: #fff;
  text-decoration: none;
  background-color: white;
}

.expand-enter-active,
.expande-leave-active {
  transition: opacity 0.1s;
}

.expande-enter,
.expand-leave-to {
  opacity: 0;
}

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

.sidebar-item-menu {
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: -4px;
}

.sidebar-item-submenu {
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: -4px;
}

.sidebar-item-menu div {
  width: 100%;
  padding: 5px;
}

.sidebar-item-menu:hover div {
  color: white;
  background-color: #0097a7;
  transition: all 150ms linear;
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.sidebar-item-menu.active,
.sidebar-item-menu:active {
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

.expand-enter-active,
.expande-leave-active {
  transition: opacity 0.1s;
}

.expande-enter,
.expand-leave-to {
  opacity: 0;
}

.close-sidebar-new-resolution {
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 13%;
  margin-left: 12%;
  z-index: 1;
}

@media only screen and (height: 582px) {
  close-sidebar-some-menus-not-hd-not-full-hd {
    margin-top: 10%;
  }
  close-sidebar-not-hd-not-full-hd {
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-top: 20%;
    margin-left: 12%;
    z-index: 1;
  }
}

@media only screen and (height: 657px) {
  close-sidebar-some-menus-not-hd-not-full-hd {
    margin-top: 10%;
  }
  close-sidebar-not-hd-not-full-hd {
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-top: 20%;
    margin-left: 12%;
    z-index: 1;
  }
}

@media only screen and (max-width: 1366px) {
  close-sidebar-some-menus {
    margin-top: 10%;
  }
  close-sidebar {
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-top: 20%;
    margin-left: 12%;
    z-index: 1;
  }
}
@media only screen and (min-width: 1900px) {
  close-sidebar-some-menus {
    margin-top: 0%;
  }
  close-sidebar {
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-top: 14%;
    margin-left: 12%;
    z-index: 1;
  }
}

.close-sidebar {
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 11.4%;
  margin-left: 12%;
  z-index: 1;
}

.close-sidebar-hd {
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 15.5%;
  margin-left: 12%;
  z-index: 1;
}

.close-sidebar-agent {
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 14%;
  margin-left: 12%;
  z-index: 1;
}
</style>