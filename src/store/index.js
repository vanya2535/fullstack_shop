import Vue from 'vue'
import Vuex from 'vuex'
import clothesFilter from './modules/clothesFilter.js'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: {
      namespaced: true,
      ...user
    },

    clothesFilter: {
      namespaced: true,
      ...clothesFilter
    }
  }
})
