<template>
  <div class="index">
    <header class="index__header">
      <Logo width="137" />
    </header>

    <main class="index__main">
      <ClothesFilterList
        class="index__filter-list"
        readonly
        :selectedFilters="filters"
        @redirect="redirect"
      />

      <template v-if="loading">
        <BackgroundWrapper />

        <SpinLoading stroke="primary" size="85" class="index__spin-loading" />
      </template>

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
import { mapActions } from 'vuex'
import ClothesItemList from '@/components/lots/ClothesItemList.vue'
import ClothesFilterList from '@/components/lots/ClothesFilterList.vue'
import Logo from '@/assets/img/logo.svg'

export default {
  name: 'Search',

  components: { Logo, ClothesItemList, ClothesFilterList },

  data: () => ({
    loading: true,

    pageCount: null,
    currentPage: 1,

    filters: []
  }),

  computed: {
    query() {
      return {
        filters: this.filters,
        page: this.currentPage
      }
    }
  },

  methods: {
    ...mapActions('clothesFilters', ['GET_CLOTHES_FILTERS']),
    ...mapActions('clothesItems', ['GET_CLOTHES_ITEMS']),

    updateURL() {
      this.$router.replace({
        name: 'MainSearch',
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

    onPageChange(page) {
      this.currentPage = page
      this.getData()
    },

    redirect() {
      this.$router.push({ name: 'Main', params: { filters: this.filters } })
    }
  },

  async mounted() {
    await this.GET_CLOTHES_FILTERS()

    const page = this.$route.query.page
    if (page) {
      this.currentPage = page
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
    justify-content: center;
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
