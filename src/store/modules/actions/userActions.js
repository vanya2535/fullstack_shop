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
      const formdata = new FormData()
      for (let key of Object.keys(payload)) {
        if (
          typeof payload[key] === 'object' &&
          !(payload[key] instanceof File)
        ) {
          for (let subkey of Object.keys(payload[key])) {
            formdata.set(key + `[${subkey}]`, payload[key][subkey])
          }
        } else {
          formdata.set(key, payload[key])
        }
      }

      const { data } = await this._vm.$api.patch('/user/update', formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
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
