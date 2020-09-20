<template>
  <div class="app-login">
    <form class="col-lg-6 app-form">
      <h1>Logar</h1>

      <div class="form-group">
        <label>Endereço de email</label>
        <input type="email" class="form-control"  placeholder="eu@email.com.br" v-model="user.email">
      </div>

      <div class="form-group">
        <label>Senha</label>
        <input type="password" class="form-control" placeholder="123456" v-model="user.senha">
      </div>

      <div class="row">
        <div class="col">
          <button type="button" class="btn btn-primary btn-lg btn-block" @click="log()">Logar</button>
        </div>

        <div class="col">
          <button type="button" class="btn btn-success btn-lg btn-block" @click="cadastrar()">Cadastrar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: "Login",
    data(){
      return {
        user: {
          email: '',
          senha: ''
        }
      }
    },
    computed: {
      ...mapState(['isLoged'])
    },
    methods: {
      ...mapActions(['logIn']),
      log(){
        if(this.logIn(this.user)) {
          console.log('retornou true')
          setTimeout(this.goToMedicos, 1000)
        }
      },
      cadastrar(){
        this.$router.push({path: '/cadastrar'})
      },
      goToMedicos(){
        this.$router.push({path: '/medicos'})
      }

    }
  }
</script>

<style>
  .app-login {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: inherit;
  }

  .app-form {
    background-color:#048BC922;
    padding: 50px;
    border-radius: 0.5em;
  }
</style>
