export default {
  IS_LOGGED(state) {
    return state._id ? true : false
  },

  USER(state) {
    return state
  }
}
