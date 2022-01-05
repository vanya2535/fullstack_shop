export default {
  SET_CLOTHES_FILTERS(state, data) {
    state.sexFilters = data.filter((filter) => filter.type === 'sex')
    state.clothesFilters = data.filter((filter) => filter.type === 'clothes')
    state.priceFilters = data.filter((filter) => filter.type === 'price')
  }
}
