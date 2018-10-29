<template>
  <div class="app-login">
    <form class="col-lg-6 app-form">
      <h1>Cadastrar</h1>

      <div class="form-group">
        <label for="exampleInputEmail1">Endereço de email</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="eu@email.com.br" v-model="user.email">
      </div>

      <div class="form-group">
        <label for="exampleInputPassword1">Senha</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="123456" v-model="user.senha">
      </div>

      <button type="button" class="btn btn-success btn-lg btn-block" @click="doCadastro()">Cadastrar</button>


    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: "Cadastrar",
    data(){
      return {
        user: {
          email: '',
          senha: ''
        }

      }
    },
    methods: {
      ...mapActions(['cadastrar']),
      doCadastro(){
        this.cadastrar(this.user)
      }
    }
  }
</script>

<style scoped>

</style>
