import clothesFilterActions from './actions/clothesFilterActions'
import clothesFilterGetters from './getters/clothesFilterGetters'
import clothesFilterMutations from './mutations/clothesFilterMutations'

export default {
  state: () => ({
    sexFilters: null,
    clothesFilters: null
  }),
  actions: clothesFilterActions,
  mutations: clothesFilterMutations,
  getters: clothesFilterGetters
}
