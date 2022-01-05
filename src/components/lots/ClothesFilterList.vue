<template>
  <div class="list">
    <span
      v-for="filter of SEX_FILTERS"
      :key="filter._id"
      class="list__item"
      :class="{ list__item_selected: filters.sex === filter._id }"
      @click="setFilter('sex', filter._id)"
    >
      <p>{{ filter.value }}</p>
    </span>
    <span
      v-for="filter of CLOTHES_FILTERS"
      :key="filter._id"
      class="list__item"
      :class="{ list__item_selected: filters.clothes === filter._id }"
      @click="setFilter('clothes', filter._id)"
    >
      <p>{{ filter.value }}</p>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ClothesFilterList',

  props: {
    selectedFilters: Array,
    validator: (value) => {
      return value.lenght <= 2 && value.every((el) => typeof el === 'string')
    }
  },

  data: () => ({
    filters: {
      sex: '',
      clothes: ''
    }
  }),

  computed: {
    ...mapGetters('clothesFilters', ['SEX_FILTERS', 'CLOTHES_FILTERS'])
  },

  methods: {
    setFilter(key, value) {
      this.filters[key] = value
      this.$emit(
        'change',
        Object.values(this.filters).filter((filter) => filter)
      )
    }
  },

  watch: {
    selectedFilters() {
      for (let filter of this.selectedFilters) {
        const sexFilters = this.SEX_FILTERS.map((filter) => filter._id)
        if (sexFilters.includes(filter)) {
          this.filters.sex = filter
        } else {
          this.filters.clothes = filter
        }
      }
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
