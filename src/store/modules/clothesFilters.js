import clothesFiltersActions from './actions/clothesFiltersActions'
import clothesFiltersGetters from './getters/clothesFiltersGetters'
import clothesFiltersMutations from './mutations/clothesFiltersMutations'

export default {
  state: () => ({
    sexFilters: null,
    clothesFilters: null,
    priceFilters: null
  }),
  actions: clothesFiltersActions,
  mutations: clothesFiltersMutations,
  getters: clothesFiltersGetters
}
