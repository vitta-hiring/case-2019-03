<template>
  <div>
    <!-- NO SUB-MENUS -->
    <b-dropdown-text
      style="text-align: left; margin-bottom: 0.3rem; margin-top: 0.3rem; width: 150%;"
      class="f-14-300-gray"
      v-if="menu.id == 0"
    >{{$t('subsection')}}</b-dropdown-text>
    <!-- NO SUB-MENUS END -->

    <!-- MENU -->
    <b-dropdown-item v-if="menu.rule.stateName != ''" @click.stop="clickToRoute">
      <router-link
        v-if="menu.rule.route != ''"
        :class="{'route-menu': fullHD}"
        class="f-14-300-gray"
        tag="div"
        :to="to"
      >{{ $t(menu.rule.displayName) }}</router-link>
      <div
        :class="{'route-menu': fullHD}"
        v-if="menu.rule.route == ''"
        @click.stop="openSubMenu"
        class="f-14-300-gray"
      >
        {{ $t(menu.rule.displayName) }}
        <!-- <img src="/static/icons/right-arrow.svg" class="mg-right" /> -->
      </div>
    </b-dropdown-item>
    <!-- MENU END -->

    <div class="divider" v-if="index != (size -1)"></div>
    <div class="divider" v-if="index != (size -1)"></div>
    <div
      class="divider"
      v-if="index == (size -1) && this.$store.getters.getAmIOnTheMainMenus == false"
    ></div>

    <!-- TO BACK -->
    <b-dropdown-text
      @click.stop="backToTopMenu"
      v-if="index == (size -1) && this.$store.getters.getAmIOnTheMainMenus == false"
      class="ticket-menu-item last-item"
      style="cursor: pointer"
    >
      <div
        @click.stop="backToTopMenu"
        style="text-align: center; margin-top: -0.5rem; margin-left: 4%; width: 93%;"
        class="f-14-300-gray"
      >{{$t('navbar.menu.back')}}</div>
      <!-- <icon
          @click.stop="backToTopMenu"
          name="left-arrow"
          widthValue="22"
          class="mg-left"
          marginTopValue="-2.4"
      />-->
    </b-dropdown-text>
    <!-- TO BACK END -->
  </div>
</template>

<script>
export default {
  created() {
    window.innerWidth > 1919 ? (this.fullHD = true) : (this.HD = true);
  },

  data() {
    return {
      lastItemInSubmenu: undefined,
      toggle: false,
      HD: undefined,
      fullHD: undefined
    };
  },

  methods: {
    clickToRoute() {
      this.backToTopMenu();
      this.$emit("eventCloseMainMenu", true);
    },

    backToTopMenu() {
      this.$emit("eventBackToTopMenu", true);
    },
    openSubMenu() {
      this.$emit("eventShowSubMenu", true, this.menu.rule.stateName);
    }
  },

  computed: {
    to() {
      return this.menu.rule.route;
    },

    style() {
      let value = "";
      this.widthValue
        ? (value = "width:" + this.widthValue + "px;")
        : (value = "width: 32px;");
      this.marginTopValue
        ? (value = value + "margin-top:" + this.marginTopValue + "rem;")
        : (value = value + "margin-top: 0rem;");
      return value;
    }
  },

  props: {
    menu: {
      type: Object
    },
    index: {
      type: Number
    },
    size: {
      type: Number
    },
    marginTopValue: {
      type: String
    }
  }
};
</script>

<style scoped>
.route-menu {
  padding: 0.5rem 2rem 0.7rem 0.7rem;
  margin: 0rem 1rem 0.1rem 0rem;
}

.mg-left {
  float: right;
}

.mg-right {
  width: 20px;
  margin-top: -0.3rem;
  margin-left: 0rem;
}

.last-item {
  height: 2.8rem;
}

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

.back-divider {
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 2rem;
  width: 0rem;
  margin: 1rem 1rem 1rem 1rem;
  padding: 1rem 1rem 1rem 1rem;
  overflow: hidden;
  border-top: 1px solid #e9ecef;
}

.divider {
  height: 0;
  margin: 0rem 0;
  overflow: hidden;
  border-top: 1px solid #e9ecef;
}

.menu-ticket {
  margin: 0rem 0rem 0rem 0rem;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  opacity: 1;
  width: 100%;
}

.ticket-menu-item {
  margin-top: 0rem;
  border-radius: 0rem;
  opacity: 0.86;
  margin: 0rem 0rem 0.3rem 0em;
  padding: 1rem 0rem 0.8rem 0rem;
  width: 100%;
  cursor: pointer;
  margin-left: 0rem;
}

.ticket-menu-item div {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: -1rem;
  margin-top: -1rem;
}

.ticket-menu-item:hover div {
  color: white;
  background-color: #0097a7;
  /* padding: -1rem -1rem -1rem -1rem;
  margin: -1rem -1rem 0rem 0em; */
  transition: all 150ms linear;
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.ticket-menu-item.active,
.ticket-menu-item:active {
  color: #fff;
  text-decoration: none;
  background-color: white;
}

.submenu-item-back-divider {
  margin-top: 0rem;
  margin: 1rem 0rem 1rem 0rem;
  border-radius: 0rem;
  opacity: 0.86;
  padding: 0rem 0rem 0rem 0rem;
  width: 85%;
}

.submenu-item-back-divider div {
  width: 100%;
  position: relative;
  padding: 1rem 1rem 1rem 1rem;
  margin-bottom: 0rem;
  margin-top: 0rem;
}

.submenu-item-back-divider:hover div {
  color: white;
  background-color: #0097a7;
  transition: all 150ms linear;
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.submenu-item-back-divider.active,
.submenu-item-back-divider:active {
  color: #fff;
  text-decoration: none;
  background-color: white;
}

.icon-position {
  margin-top: 0rem;
  margin-left: 0rem;
  margin-right: 0rem;
}

.icon-size {
  width: 32rem;
  cursor: pointer;
}
</style>