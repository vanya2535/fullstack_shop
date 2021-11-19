import clothesItemActions from './actions/clothesItemActions'
import clothesItemsGetters from './getters/clothesItemsGetters'
import clothesItemMutations from './mutations/clothesItemMutations'

export default {
  state: () => ({
    clothesItems: null
  }),
  actions: clothesItemActions,
  mutations: clothesItemMutations,
  getters: clothesItemsGetters
}
