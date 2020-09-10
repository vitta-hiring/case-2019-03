<template>
  <div>
    <!-- NO SUB-MENUS -->
    <b-dropdown-text
      :class="{'no-submenus': fullHD, 'no-submenus-hd': HD}"
      class="f-14-300-gray"
      v-if="menu.id == 0"
    >{{$t('subsection')}}</b-dropdown-text>
    <!-- NO SUB-MENUS END -->

    <!-- MENU -->
    <b-dropdown-text
      v-if="menu.rule.stateName != ''"
      @click.stop="clickToRoute"
      :class="{'submenu-item': fullHD, 'submenu-item-hd': HD}"
      style="cursor: pointer"
    >
      <router-link
        v-if="menu.rule.route != ''"
        class="f-14-300-gray"
        tag="div"
        :to="to"
      >{{ $t(menu.rule.displayName) }}</router-link>
      <div v-if="menu.rule.route == ''" @click.stop="openSubMenu" class="f-14-300-gray">
        {{ $t(menu.rule.displayName) }}
        <!-- <img
          v-if="fullHD"
          src="/static/icons/right-arrow.svg"
          class="mg-right"
        />
        <img v-if="HD" src="/static/icons/right-arrow.svg" class="mg-right-hd" />-->
      </div>
    </b-dropdown-text>
    <!-- MENU END -->

    <div class="divider" v-if="index != (size -1)"></div>
    <div class="divider" v-if="index != (size -1)"></div>
    <div
      class="divider"
      v-if="index == (size -1) && this.$store.getters.getAmIOnTheMainMenus == false"
    ></div>

    <!-- TO BACK -->
    <b-dropdown-text
      v-on:click="backToTopMenu"
      v-if="index == (size -1) && this.$store.getters.getAmIOnTheMainMenus == false"
      class="submenu-item last-item"
      style="cursor: pointer"
    >
      <div
        v-on:click="backToTopMenu"
        style="text-align: center; margin-top: -1.2rem; margin-bottom: -2rem; margin-left: -0.2rem; width: 100%;"
        class="f-14-300-gray"
      >{{$t('navbar.menu.back')}}</div>
      <!-- <icon
        v-if="fullHD"
        v-on:click="backToTopMenu"
        name="left-arrow"
        widthValue="28"
        class="mg-left"
        marginTopValue="-2.2"
      />
      <icon
        v-if="HD"
        v-on:click="backToTopMenu"
        name="left-arrow"
        widthValue="28"
        class="mg-left-hd"
        marginTopValue="-2.2"
      />-->
    </b-dropdown-text>
    <!-- TO BACK END -->
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import { directive as onClickaway } from "vue-clickaway";

export default {
  created() {
    if (window.innerWidth > 1370) {
      this.fullHD = true;
    } else {
      this.HD = true;
    }
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
.no-submenus {
  margin-left: 3.2rem;
  margin-bottom: 1rem;
  margin-top: -3rem;
  width: 100%;
}

.no-submenus-hd {
  margin-left: 1rem;
  margin-bottom: 1rem;
  margin-top: -2rem;
  width: 100%;
}

.mg-left {
  margin-left: 9.6rem;
}

.mg-left-hd {
  margin-left: 6rem;
}

.mg-right {
  float: right;
  width: 25px;
  margin-top: -0.5rem;
  size: 4rem;
}

.mg-right-hd {
  float: right;
  width: 24px;
  margin-top: -0.5rem;
  size: 8rem;
}

.last-item {
  height: 2rem;
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

.menu-item {
  margin-top: 0rem;
  margin-bottom: 0rem;
}

.submenu-item-back-divider {
  margin-top: 0rem;
  margin: 1rem 0rem 1rem 0rem;
  border-radius: 0rem;
  opacity: 0.86;
  padding: 1rem 1rem 1rem 1rem;
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

.submenu-item {
  margin-top: 0rem;
  margin: 1rem 0rem 1rem 0rem;
  border-radius: 0rem;
  opacity: 0.86;
  padding: 1rem 1rem 1rem 1rem;
  width: 85%;
}

.submenu-item div {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: -1rem;
  margin-top: -1rem;
}

.submenu-item:hover div {
  color: white;
  background-color: #0097a7;
  transition: all 150ms linear;
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.submenu-item.active,
.submenu-item:active {
  color: #fff;
  text-decoration: none;
  background-color: white;
}

.submenu-item-hd {
  margin-top: 0rem;
  margin: 0rem 0rem 0rem 0rem;
  border-radius: 0rem;
  opacity: 0.86;
  padding: 0.5rem 0.5rem 1rem 1rem;
  width: 100%;
}

.submenu-item-hd div {
  width: 100%;
  padding: 0.4rem;
  margin-bottom: 0rem;
  margin-top: -1rem;
}

.submenu-item-hd:hover div {
  color: white;
  background-color: #0097a7;
  transition: all 150ms linear;
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.submenu-item-hd.active,
.submenu-item-hd:active {
  color: #fff;
  text-decoration: none;
  background-color: white;
}

.icon-position {
  margin-top: 0rem;
  margin-left: 0rem;
  margin-right: 0rem;
}

.sidebar-menu {
  margin-top: 0rem;
}

.icon-size {
  width: 32rem;
  cursor: pointer;
}
</style>