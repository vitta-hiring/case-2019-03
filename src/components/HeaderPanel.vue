<template>
  <nav class="navbar navbar-expand-md bg-default navbar-default">
    <!-- Brand -->
    <a class="navbar-brand">
      <i class="logo-vitta"></i>
    </a>

    <!-- Toggler/collapsibe Button -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navbar links -->
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" v-bind:to="'index'">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" v-bind:to="'prescricao'">Prescrição</router-link>
        </li>
      </ul>
    </div>
    <a href @click="clearSessions" class="nav-link">Logout</a>
  </nav>
</template>

<script>
import service from '@/services/mock.service'

export default {
  name: 'HeaderPanel',
  components: { },
  data () {
    return { }
  },
  methods: {
    clearSessions () {
      service.removeUserSession()
      service.removePrescricao()
      this.$router.push({name: 'login'})
    }
  },
  mounted () {}
}
</script>
