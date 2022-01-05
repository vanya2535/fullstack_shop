<template>
  <div class="index">
    <Header />

    <h6 class="index__title">You can pick anything want you want</h6>

    <main class="index__main">
      <ClothesFilterList
        priceFilters
        :selectedFilters="filters"
        @change="filters = $event"
      >
        <template #categorySubtitle> Categories </template>
        <template #priceSubtitle> Prices </template>
      </ClothesFilterList>
    </main>

    <footer class="index__footer">
      <Button class="index__search-button" @click="search">
        <h6>Search</h6>
      </Button>
    </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ClothesFilterList from '@/components/lots/ClothesFilterList.vue'

export default {
  name: 'Index',

  components: { ClothesFilterList },

  data: () => ({
    loading: true,

    filters: []
  }),

  methods: {
    ...mapActions('clothesFilters', ['GET_CLOTHES_FILTERS']),

    search() {
      this.$router.push({
        name: 'MainSearch',
        query: { filters: this.filters }
      })
    }
  },

  async mounted() {
    await this.GET_CLOTHES_FILTERS()

    const filters = this.$route.params.filters
    if (typeof filters === 'string') {
      this.filters = [filters]
    } else if (typeof filters === 'object') {
      this.filters = filters
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  @include padding;

  padding-right: 3%;
  padding-left: 3%;
  text-align: center;
  color: $primary;

  &__title {
    margin-top: 55px;
  }

  &__main {
    display: inline-block;
    margin-top: 35px;
    text-align: left;
  }

  &__footer {
    margin-top: 77px;
  }

  &__search-button {
    border-radius: 24px !important;
    width: 251px;
    height: 40px;
    text-transform: uppercase;
  }
}
</style>
