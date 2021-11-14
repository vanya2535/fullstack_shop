export default {
  SET_USER_DATA(state, data) {
    for (let key of Object.keys(data)) {
      state[key] = data[key]
    }
    localStorage.setItem('user', JSON.stringify(state))
  },

  LOGOUT(state) {
    for (let key of ['_id', 'username', 'role']) {
      state[key] = null
    }
    localStorage.removeItem('user')
  }
}
