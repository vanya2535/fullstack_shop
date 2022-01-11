import clothesFiltersActions from './actions/clothesFiltersActions'
import clothesFiltersGetters from './getters/clothesFiltersGetters'
import clothesFiltersMutations from './mutations/clothesFiltersMutations'

export default {
  state: () => ({
    sexFilters: [],
    clothesFilters: [],
    priceFilters: []
  }),
  actions: clothesFiltersActions,
  mutations: clothesFiltersMutations,
  getters: clothesFiltersGetters
}
