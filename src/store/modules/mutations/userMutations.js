export default {
  SET_USER_DATA(state, data) {
    for (let key of Object.keys(data)) {
      state[key] = data[key]
    }
    localStorage.setItem('user', JSON.stringify(state))
  }
}
