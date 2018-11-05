export default {
  CHANGE_DIALOG (state, data) {
    state.dialog = data
  },

  REFRESH_LIST (state, data) {
    state.patients = data
  }
}
