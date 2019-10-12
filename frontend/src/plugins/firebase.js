import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDmLx7N115oTwdLO43wjeOfLc7PVjBw3C0',
  authDomain: 'more-doctors.firebaseapp.com',
  databaseURL: 'hhttps://more-doctors.firebaseio.com',
  projectId: 'more-doctors',
  storageBucket: 'more-doctors.appspot.com',
  messagingSenderId: '393176153587'
}

firebase.initializeApp(config)

export const auth = firebase.auth()

export default ({ app, router, Vue }) => {
  Vue.prototype.$auth = auth
}
