import clothesItemsActions from './actions/clothesItemsActions'
import clothesItemsGetters from './getters/clothesItemsGetters'
import clothesItemsMutations from './mutations/clothesItemsMutations'

export default {
  state: () => ({
    clothesItems: []
  }),
  actions: clothesItemsActions,
  mutations: clothesItemsMutations,
  getters: clothesItemsGetters
}
