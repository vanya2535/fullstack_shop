<template>
  <div class="list">
    <span
      v-for="filter of SEX_FILTERS"
      :key="filter._id"
      class="list__item"
      :class="{ list__item_selected: selectedFilters.sex === filter._id }"
      @click="selectedFilters.sex = filter._id"
    >
      <p>{{ filter.value }}</p>
    </span>
    <span
      v-for="filter of CLOTHES_FILTERS"
      :key="filter._id"
      class="list__item"
      :class="{ list__item_selected: selectedFilters.clothes === filter._id }"
      @click="selectedFilters.clothes = filter._id"
    >
      <p>{{ filter.value }}</p>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ClothesFilterList',

  data: () => ({
    selectedFilters: {
      sex: '',
      clothes: ''
    }
  }),

  computed: {
    ...mapGetters('clothesFilters', ['SEX_FILTERS', 'CLOTHES_FILTERS'])
  },

  watch: {
    selectedFilters: {
      handler(value) {
        this.$emit('select', value)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 12px;
  color: $primary;

  &__item {
    border: 1px solid $border;
    padding: 1px 13px;
    line-height: 23px;
    cursor: pointer;

    &_selected,
    &:hover {
      border: 1px solid $border-selected;
    }
  }
}
</style>
