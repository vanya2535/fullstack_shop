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
      const { data } = await this._vm.$api.patch('user/update', payload)
      commit('SET_USER_DATA', data)
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  async UPDATE_AVATAR({ commit }, payload) {
    try {
      const formdata = new FormData()
      formdata.set('avatar', payload.avatar)
      formdata.set('_id', payload._id)

      const { data } = await this._vm.$api.patch(
        '/user/update-avatar',
        formdata,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      commit('SET_USER_DATA', data)
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  },

  async CHANGE_PASSWORD({ commit }, payload) {
    try {
      const { data } = await this._vm.$api.patch(
        '/user/change-password',
        payload
      )
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
