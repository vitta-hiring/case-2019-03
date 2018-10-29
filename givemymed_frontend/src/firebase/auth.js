import { auth } from './index'

export const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)

export const doSignOut = () => auth.signOut

export const doPasswordReset = (email) => auth.sendPasswordResetEmail(email)

export const doPasswordUpdate = (pass) => auth.currentUser.updatePassword(pass)
