export default {
  async GET_CLOTHES_ITEMS({ commit }, payload) {
    try {
      const { data, headers } = await this._vm.$api.get('/clothes-item', {
        params: payload
      })
      commit('SET_CLOTHES_ITEMS', data)
      return Promise.resolve({ data, headers })
    } catch (e) {
      return Promise.reject(e)
    }
  },

  async CREATE_CLOTHES_ITEM({ commit }, payload) {
    try {
      const formdata = new FormData()
      console.log(payload)
      for (let key of Object.keys(payload)) {
        if (
          typeof payload[key] === 'object' &&
          !(payload[key] instanceof File)
        ) {
          formdata.set(key, JSON.stringify(payload[key]))
        } else {
          formdata.set(key, payload[key])
        }
      }

      const { data } = await this._vm.$api.post(
        '/clothes-item/create',
        formdata,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      return Promise.resolve(data)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
