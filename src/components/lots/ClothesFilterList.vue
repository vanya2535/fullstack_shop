<template>
  <div class="list__wrapper">
    <template v-if="!readonly">
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
    </template>

    <template v-else>
      <div class="list">
        <span
          v-for="filter of valualizedFilters"
          :key="filter._id"
          class="list__item list__item_selected list__item_readonly"
        >
          <p>{{ filter.value }}</p>
        </span>
        <Button type="text" class="list__button" @click="$emit('redirect')">
          <p>add filter +</p>
        </Button>
      </div>
    </template>
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
    },

    readonly: {
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
      'PRICE_FILTERS',
      'ALL_FILTERS'
    ]),

    valualizedFilters() {
      return this.ALL_FILTERS.filter(({ _id }) =>
        Object.values(this.filters).includes(_id)
      )
    }
  },

  methods: {
    setFilter(key, value) {
      if (this.filters[key] === value) {
        this.filters[key] = ''
      } else {
        this.filters[key] = value
      }
      this.$emit(
        'change',
        Object.values(this.filters).filter((filter) => filter)
      )
    },

    selectFilters() {
      if (this.selectedFilters) {
        for (let filter of this.selectedFilters) {
          const sexFilters = this.SEX_FILTERS.map((filter) => filter._id)
          const clothesFilters = this.CLOTHES_FILTERS.map(
            (filter) => filter._id
          )
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
  },

  watch: {
    selectedFilters() {
      this.selectFilters()
    }
  },

  mounted() {
    this.selectFilters()
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

    &_readonly {
      cursor: default;
    }

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
