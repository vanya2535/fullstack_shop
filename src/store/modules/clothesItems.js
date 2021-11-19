import clothesItemsActions from './actions/clothesItemsActions'
import clothesItemsGetters from './getters/clothesItemsGetters'
import clothesItemsMutations from './mutations/clothesItemsMutations'

export default {
  state: () => ({
    clothesItems: null
  }),
  actions: clothesItemsActions,
  mutations: clothesItemsMutations,
  getters: clothesItemsGetters
}
