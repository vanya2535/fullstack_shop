import Vue from 'vue'
import Vuex from 'vuex'
import clothesFilters from './modules/clothesFilters.js'
import clothesItems from './modules/clothesItems.js'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: {
      namespaced: true,
      ...user
    },

    clothesFilters: {
      namespaced: true,
      ...clothesFilters
    },

    clothesItems: {
      namespaced: true,
      ...clothesItems
    }
  }
})
