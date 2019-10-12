<template>
    <div
      class="full-width">
      <q-toolbar
        color="primary">
        <q-icon
          name="vpn_key" />
          <q-toolbar-title>
            {{ $t('general.appName') }} - {{ $t('general.login') }}
          </q-toolbar-title>
      </q-toolbar>
      <div
        class="layout-view layout-padding">
        <q-field
          icon="mail"
          :error-label="$t('login.email.validEmailRequired')">
          <q-input
            v-model="credentials.email"
            :float-label="$t('login.email.placeholder')"
            class="full-width"
            ref="email" />
        </q-field>
        <q-field
          icon="vpn_key">
          <q-input
            v-model="credentials.password"
            type="password"
            :float-label="$t('login.password.placeholder')"
            class="full-width" />
        </q-field>
        <div
          class="submit row reverse m-10">
          <q-btn class="m-5" color="primary" @click="login(credentials)">{{ $t('general.login') }}</q-btn>
          <q-btn class="m-5" color="secondary" @click="cancel">{{ $t('general.cancel') }}</q-btn>
        </div>
        <div
          class="layout-view layout-padding">
          <router-link :to="{name: 'signup'}">
            <q-btn class="full-width m-5" @click="$router.push({ name: 'signup' })"> {{ $t('login.createAnAccount') }} </q-btn>
          </router-link>
          <q-btn class="full-width m-5" color="red" @click="signInWithGoogle"> {{ $t('login.loginUsingGoogle') }} </q-btn>
        </div>
      </div>
    </div>
  </template>

<script>
import firebase from 'firebase'
import { QBtn, QInput, QField } from 'quasar'

export default {
  name: 'Login',
  data () {
    return {
      msg: 'More Doctors',
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    cancel () {
      this.credentials.email = ''
      this.credentials.password = ''
    },
    signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(({ user }) => this.successLogin(user))
        .catch(err => alert(err))
    },
    login () {
      firebase.auth().signInWithEmailAndPassword(this.credentials.email, this.credentials.password)
        .then(({ user }) => this.successLogin(user))
        .catch(err => alert(err))
    },
    successLogin (obj) {
      Object.keys(obj).forEach(el => {
        localStorage.setItem(el, obj[el])
      })
      this.$router.push({ name: 'dashboard' })
    }
  },
  components: { QBtn, QInput, QField }
}
</script>

<style scoped>
</style>
