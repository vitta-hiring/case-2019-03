<template>
  <div class="login">
    <div
      class="full-width">
      <q-toolbar
        color="primary">
        <q-icon
          name="vpn_key" />
          <q-toolbar-title>
            {{ $t('general.appName') }} - {{ $t('general.signUp') }}
          </q-toolbar-title>
      </q-toolbar>
      <div
        class="layout-view layout-padding">
        <q-field
          icon="mail"
          :error-label="$t('login.email.validEmailRequired')">
          <q-input
            v-model="credentials.email"
            :placeholder="$t('login.email.placeholder')"
            :float-label="$t('login.email.placeholder')"
            class="full-width"
            ref="email" />
        </q-field>
        <q-field
          icon="vpn_key">
          <q-input
            v-model="credentials.password"
            type="password"
            :placeholder="$t('login.password.placeholder')"
            :float-label="$t('login.password.placeholder')"
            class="full-width" />
        </q-field>
        <div
          class="submit row reverse m-10">
          <q-btn
            class="m-5 layout-view full-width"
            color="secondary"
            @click="signUp">{{ $t('general.signUp') }}</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QBtn, QInput, QField } from 'quasar'
import firebase from 'firebase'

export default {
  name: 'SignUp',
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.credentials.email, this.credentials.password)
        .then(user => {
          if (user) {
            const msg = confirm(this.$t('general.accountCreated'))
            if (msg) {
              this.$router.push({ path: '/' })
            }
          }
        })
        .catch(err => alert(err))
    }
  },
  components: { QBtn, QInput, QField }
}
</script>
