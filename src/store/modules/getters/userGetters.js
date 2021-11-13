export default {
  IS_LOGGED(state) {
    return state.username ? true : false
  }
}
