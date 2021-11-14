import userActions from './actions/userActions.js'
import userMutations from './mutations/userMutations.js'
import userGetters from './getters/userGetters.js'

export default {
  state: () => ({
    _id: '',
    username: '',
    role: null
  }),
  actions: userActions,
  mutations: userMutations,
  getters: userGetters
}
