export default {
  async LOGIN({ commit }, payload) {
    try {
      const { data } = await this._vm.$api.post('/user/login', payload)
      commit('SET_USER_DATA', data)
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  async REGISTER({ commit }, payload) {
    try {
      const { data } = await this._vm.$api.post('/user/register', payload)
      commit('SET_USER_DATA', data)
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  async UPDATE_USER({ commit }, payload) {
    try {
      const { data } = await this._vm.$api.patch('/user/update', payload)
      commit('SET_USER_DATA', data)
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
