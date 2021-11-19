export default {
  async GET_CLOTHES_FILTERS({ commit }) {
    try {
      const { data } = await this._vm.$api.get('/clothes-filter')
      commit('SET_CLOTHES_FILTERS', data)
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
