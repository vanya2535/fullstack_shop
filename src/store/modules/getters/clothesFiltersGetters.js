export default {
  SEX_FILTERS(state) {
    return state.sexFilters ? state.sexFilters : []
  },

  CLOTHES_FILTERS(state) {
    return state.clothesFilters ? state.clothesFilters : []
  }
}