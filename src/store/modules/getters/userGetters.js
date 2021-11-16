export default {
  IS_LOGGED(state) {
    return state._id ? true : false
  },

  USER(state) {
    return state
  },

  AVATAR(state) {
    return `http://localhost:3000/${state.avatar}`
  }
}
