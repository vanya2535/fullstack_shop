<template>
  <div class="list__wrapper">
    <h6 class="list__subtitle">
      <slot name="categorySubtitle" />
    </h6>
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
    <h6 class="list__subtitle">
      <slot name="priceSubtitle" />
    </h6>
    <div v-if="priceFilters" class="list">
      <span
        v-for="filter of PRICE_FILTERS"
        :key="filter._id"
        class="list__item"
        :class="{ list__item_selected: filters.price === filter._id }"
        @click="setFilter('price', filter._id)"
      >
        <p>{{ filter.value }}</p>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ClothesFilterList',

  props: {
    selectedFilters: {
      type: Array,
      validator: (value) => {
        return value.length <= 3 && value.every((el) => typeof el === 'string')
      }
    },

    priceFilters: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    filters: {
      sex: '',
      clothes: '',
      price: ''
    }
  }),

  computed: {
    ...mapGetters('clothesFilters', [
      'SEX_FILTERS',
      'CLOTHES_FILTERS',
      'PRICE_FILTERS'
    ])
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
        const clothesFilters = this.CLOTHES_FILTERS.map((filter) => filter._id)
        if (sexFilters.includes(filter)) {
          this.filters.sex = filter
        } else if (clothesFilters.includes(filter)) {
          this.filters.clothes = filter
        } else {
          this.filters.price = filter
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

  &__subtitle {
    margin-bottom: 7px;
    font-size: 16px;
  }

  &:not(:last-of-type) {
    margin-bottom: 26px;
  }
}
</style>
