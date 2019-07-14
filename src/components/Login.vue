<template>
  <div class="col-sm-6 col-md-4 container">
    <div class="text-center">
      <img alt="Vue logo" src="../assets/images/logo.png">
    </div>
    <form novalidate class="form-signin" @submit="login">
      <div class="form-group">
        <input type="text" placeholder="usuário" v-model="user" class="form-control" required>
        <span class="text-danger">{{errors.user}}</span>
      </div>
      <div class="form-group">
        <input type="password" placeholder="senha" v-model="password" class="form-control" required>
        <span class="text-danger">{{errors.password}}</span>
      </div>
      <button type="submit" class="btn btn-lg btn-primary btn-block">ENTRAR</button>
    </form>
  </div>
</template>

<script>
import { mainClass } from '../mixins/mainClass'
import service from '@/services/mock.service'

export default {
  name: 'app',
  components: { },
  mixins: [mainClass],
  data () {
    return {
      errors: { },
      listMedicamentos: [],
      authentication: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    login (e) {
      this.errors = { }

      if (!this.user) {
        this.errors.user = 'Nome do usuário é obrigatório'
      } else if (this.user !== this.authentication.name) {
        this.errors.user = 'Usuário não encontrado'
      }

      if (!this.password) {
        this.errors.password = 'Digite a senha do usuário'
      } else if (this.password !== this.authentication.name) {
        this.errors.password = 'Senha incorreta'
      }

      if (!this.errors.name && !this.errors.password) {
        service.setUserSession(this.authentication)
        this.$router.push({name: 'index'})
      }
      e.preventDefault()
    },
    getAuthentication () {
      service.getAuthentication().then(result => {
        if (result) {
          this.authentication = result.data
        }
      }).catch(() => {
        this.$notify({
          group: 'foo',
          title: 'Important message',
          text: 'Erro ao buscar o serviço!'
        })
      })
    }
  },
  mounted () {
    this.getAuthentication()
  }
}
</script>
