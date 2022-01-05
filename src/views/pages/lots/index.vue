<template>
  <div class="index">
    <header class="index__header">
      <Logo class="index__logo" width="137" />

      <Button @click="$router.push({ name: 'LotsCreate' })">Add lot</Button>
    </header>

    <main class="index__main">
      <ClothesFilterList
        class="index__filter-list"
        :selectedFilters="filters"
        @change="onFilterChange"
      />

      <BackgroundWrapper v-if="loading" />

      <SpinLoading
        v-if="loading"
        stroke="primary"
        size="85"
        class="index__spin-loading"
      />

      <template v-else>
        <ClothesItemList class="index__clothes-item-list" />
      </template>
    </main>

    <footer class="index__footer">
      <Pagination
        v-if="pageCount"
        :pageCount="pageCount"
        :currentPage="currentPage"
        @change="onPageChange"
      />
    </footer>
  </div>
</template>

<script>
import Logo from '@/assets/img/logo.svg'
import { mapActions, mapGetters } from 'vuex'
import ClothesFilterList from '@/components/lots/ClothesFilterList'
import ClothesItemList from '@/components/lots/ClothesItemList'

export default {
  name: 'Index',

  components: { Logo, ClothesFilterList, ClothesItemList },

  data: () => ({
    loading: true,

    pageCount: null,
    currentPage: 1,

    filters: []
  }),

  computed: {
    ...mapGetters('user', ['ID']),

    query() {
      return {
        sellerId: this.ID,
        page: this.currentPage,
        filters: this.filters
      }
    }
  },

  methods: {
    ...mapActions('clothesFilters', ['GET_CLOTHES_FILTERS']),
    ...mapActions('clothesItems', ['GET_CLOTHES_ITEMS']),

    updateURL() {
      this.$router.replace({
        name: 'Lots',
        query: { page: this.currentPage, filters: this.filters }
      })
    },

    async getData() {
      this.loading = true

      const { headers } = await this.GET_CLOTHES_ITEMS(this.query)
      this.pageCount = Number(headers['x-pagination-page-count'])
      this.currentPage = Number(headers['x-pagination-current-page'])

      this.updateURL()

      this.loading = false
    },

    onFilterChange(filters) {
      this.filters = filters
      this.currentPage = 1
      this.getData()
    },

    onPageChange(page) {
      this.currentPage = page
      this.getData()
    }
  },

  async mounted() {
    await this.GET_CLOTHES_FILTERS()

    const page = this.$route.query.page
    if (page) {
      this.currentPage = Number(page)
    }

    const filters = this.$route.query.filters
    if (typeof filters === 'string') {
      this.filters = [filters]
    } else if (typeof filters === 'object') {
      this.filters = filters
    }

    const { headers } = await this.GET_CLOTHES_ITEMS(this.query)
    this.pageCount = Number(headers['x-pagination-page-count'])
    this.currentPage = Number(headers['x-pagination-current-page'])

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.index {
  @include padding;

  padding-right: 3%;
  padding-left: 3%;

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__logo {
    margin-right: 80px;
  }

  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 27px;
  }

  &__footer {
    margin-top: 24px;
  }

  &__clothes-item-list,
  &__spin-loading {
    margin-top: 21px;
  }

  &__filter-list,
  &__clothes-item-list {
    justify-content: center;
  }
}
</style>
