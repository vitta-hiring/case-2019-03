import firebase from 'firebase'

let config = {
  apiKey: "AIzaSyCiye2qH2fr8Yx0DKTY1iR6E7GLYOtfjIE",
  authDomain: "givemymed.firebaseapp.com",
  databaseURL: "https://givemymed.firebaseio.com",
  projectId: "givemymed",
  storageBucket: "givemymed.appspot.com",
  messagingSenderId: "81922686636"
}

firebase.initializeApp(config)

let auth = firebase.auth()

export {
  auth
}
