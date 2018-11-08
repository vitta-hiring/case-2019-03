<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{ $route.meta.title || 'More Doctors' }}
          <div slot="subtitle">{{ $t('general.frameworkUsed') }}: Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
        <q-btn flat round dense icon="exit_to_app" @click="logout"/>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Cadastros</q-list-header>
        <q-item @click.native="$router.push({ name: 'createAttendance' })">
          <q-item-side icon="person_outline" />
          <q-item-main :label="$t('dashboard.attendance.title')" :sublabel="$t('dashboard.attendance.sublabel')" />
        </q-item>
        <q-item @click.native="$router.push({ name: 'prescriptions' })">
          <q-item-side icon="bookmark" />
          <q-item-main :label="$t('dashboard.prescriptions.title')" :sublabel="$t('dashboard.prescriptions.sublabel')" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import firebase from 'firebase'
import firebaseRequests from '../mixins/firebase-requests'
import { openURL } from 'quasar'

export default {
  mixins: [firebaseRequests],
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    logout () {
      firebase.auth().signOut()
        .then(() => this.$router.push({ name: 'login' }))
        .finally(() => localStorage.clear())
    }
  }
}
</script>

<style>
</style>
