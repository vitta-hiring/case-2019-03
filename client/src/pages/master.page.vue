<script>
export default {
  name: 'MasterPage',
  data: () => ({
    menuVisible: false
  }),
  methods: {
    closeMenu: function () {
      this.menuVisible = !this.menuVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.md-app {
  height: 100vh;
  border: 1px solid rgba(#000, 0.12);
}

.md-title {
  width: 90vw;

  .logo-toolbar {
    display: block;
    width: 150px;
    height: 50px;
    margin: 1px auto;
    background: url("../assets/images/logo-vitta.svg") no-repeat;
    background-size: 150px;
  }
}

.md-drawer {
  width: 300px;
  max-width: calc(100vw - 125px);
}

.md-content {
  margin-top: 20px;
}
</style>

<template>
  <div class="page-container">
    <md-app
      md-waterfall
      md-mode="overlap">
      <md-app-toolbar class="md-large">
        <div class="md-toolbar-row">
          <md-button
            class="md-icon-button"
            @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>

          <span class="md-title">
            <i class="logo-toolbar"/>
          </span>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar
          class="md-transparent"
          md-elevation="0">
          Menu Principal
        </md-toolbar>

        <md-list>
          <router-link to="/">
            <md-list-item @click="closeMenu()">
              <md-icon>home</md-icon>
              <span class="md-list-item-text">Página Inicial</span>
            </md-list-item>
          </router-link>

          <router-link to="/patients">
            <md-list-item @click="closeMenu()">
              <md-icon>move_to_inbox</md-icon>
              <span class="md-list-item-text">Pacientes</span>
            </md-list-item>
          </router-link>

          <router-link to="/doctors">
            <md-list-item @click="closeMenu()">
              <md-icon>send</md-icon>
              <span class="md-list-item-text">Médicos</span>
            </md-list-item>
          </router-link>

          <router-link to="/medications">
            <md-list-item @click="closeMenu()">
              <md-icon>delete</md-icon>
              <span class="md-list-item-text">Medicações</span>
            </md-list-item>
          </router-link>

          <router-link to="/prescriptions">
            <md-list-item @click="closeMenu()">
              <md-icon>delete</md-icon>
              <span class="md-list-item-text">Prescrição Médica</span>
            </md-list-item>
          </router-link>

          <router-link to="/interactions">
            <md-list-item @click="closeMenu()">
              <md-icon>error</md-icon>
              <span class="md-list-item-text">Interação Medicamentosa</span>
            </md-list-item>
          </router-link>
        </md-list>
      </md-app-drawer>

      <md-app-content class="md-layout md-gutter md-alignment-center-space-around">
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>
