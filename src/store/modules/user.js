import userActions from './actions/userActions.js'
import userMutations from './mutations/userMutations.js'
import userGetters from './getters/userGetters.js'

export default {
  state: () => ({
    _id: null,
    username: null,
    role: null,
    avatar: null,
    firstname: null,
    lastname: null,
    links: []
  }),
  actions: userActions,
  mutations: userMutations,
  getters: userGetters
}
