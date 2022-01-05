<template>
  <div class="pagination">
    <button
      v-for="number in pagination"
      :key="$uuid(number)"
      :class="
        'pagination__button ' +
        `${number === currentPage ? 'pagination__button_current' : ''}` +
        `${number === '...' ? 'pagination__button_disabled' : ''}`
      "
      @click="input(number)"
    >
      <h6>{{ number }}</h6>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    pageCount: {
      type: Number,
      required: true,
      validator: (value) => {
        return value >= 1
      }
    },

    currentPage: {
      type: Number,
      required: true,
      validator: (value) => {
        return value >= 1
      }
    }
  },

  computed: {
    range() {
      return [...Array(this.pageCount).keys()].map((item) => item + 1)
    },

    pagination() {
      if (this.pageCount <= 9) {
        return this.range
      } else if (
        this.currentPage >= 6 &&
        this.currentPage < this.pageCount - 2
      ) {
        return [
          1,
          '...',
          ...this.range.slice(this.currentPage - 3, this.currentPage + 2),
          '...',
          this.pageCount
        ]
      } else if (this.currentPage >= this.pageCount - 2) {
        return [1, '...', ...this.range.slice(this.pageCount - 7)]
      } else {
        return [...this.range.slice(0, 7), '...', this.pageCount]
      }
    }
  },

  methods: {
    input(number) {
      if (number !== '...') {
        this.$emit('change', Number(number))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &__button {
    @include border;

    border: none;
    border-radius: 4px;
    height: 32px;
    min-width: 32px;
    color: $primary;
    background: $white-contrast;

    &_current {
      color: $white;
      background: $primary;

      &:hover {
        background: $primary !important;
      }
    }

    &_disabled {
      cursor: default;

      &:hover {
        background: $white-contrast !important;
      }
    }

    &:not(:last-of-type) {
      margin-right: 8px;
    }

    &:hover {
      background: $border;
    }
  }
}
</style>
