export default {
  async GET_CLOTHES_ITEMS({ commit }, payload) {
    try {
      const { data } = await this._vm.$api.get('/clothes-item', {
        params: { sellerId: payload }
      })
      commit('SET_CLOTHES_ITEMS', data)
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
