export default {
  IS_LOGGED(state) {
    return state._id ? true : false
  },

  USER(state) {
    return state
  },

  AVATAR(state) {
    return state.avatar ? `http://localhost:3000/${state.avatar}` : null
  },

  ROLE(state) {
    return state.role
  },

  ID(state) {
    return state._id
  }
}
