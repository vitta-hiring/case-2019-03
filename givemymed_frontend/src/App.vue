<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <router-link to="/">
        <img class="navbar-img" src="./assets/pill.png" alt="pilula de remédio">
        <a class="navbar-brand" href="#">Give My Med</a>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/medicos" class="nav-link">Medicos</router-link>
          </li>
          <!--<li class="nav-item">-->
            <!--<router-link to="/pacientes" class="nav-link">Pacientes</router-link>-->
          <!--</li>-->



        </ul>

        <form class="form-inline">
          <button class="btn btn-outline-danger"
                  @click="logout()"
                  v-if="isLoged">
            <span>Log out!</span>
          </button>

          <button class="btn btn-outline-danger"
                  @click="goToLogin()"
                  v-if="!isLoged">
            <span>Log in!</span>
          </button>



        </form>
      </div>
    </nav>

    <router-view class="container"/>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'

  export default {
    name: 'App',
    computed: {
      ...mapState([
        'isLoged'
      ])
    },
    methods: {
      ...mapMutations(['LOG_OUT']),
      ...mapActions(['loadMedicos']),
      logout(){
        console.log('this.logout')
        this.LOG_OUT()
        this.goToLogin()
      },
      goToLogin(){
        this.$router.push({path: '/login'})
      }
    },
    created(){
      this.loadMedicos()
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  .app {
    background-color: #EDF1F3;
  }

  .list-group {
    margin-top: 10px;
  }

  .btn-outline-danger {
    border-color: #f7f7f7;
    color: #f7f7f7;
  }

  .container {
    margin-top: 5px;
  }

  body {
    background-color: #dfe6e966;
    font-family: 'Roboto', sans-serif;
  }

  .navbar-img {
    width: 32px;
    height: 32px;
    margin: 0 3px;
  }
</style>
