<template>
  <div class="index">
    <header class="index__header">
      <Logo class="index__logo" width="137" />

      <Button @click="$router.push({ name: 'LotsCreate' })">Add lot</Button>
    </header>

    <main class="index__main">
      <ClothesFilterList class="index__filter-list" @select="onFilterSelect" />

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
        v-model="currentPage"
        :pageCount="pageCount"
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
    ...mapGetters('user', ['ID'])
  },

  methods: {
    ...mapActions('clothesItems', ['GET_CLOTHES_ITEMS']),

    onFilterSelect(selectedFilters) {
      this.filters = [...Object.values(selectedFilters)].filter(
        (filter) => filter
      )
    }
  },

  watch: {
    filters: {
      async handler(value) {
        this.loading = true

        const { headers } = await this.GET_CLOTHES_ITEMS({
          sellerId: this.ID,
          filters: value
        })

        this.pageCount = Number(headers['x-pagination-page-count'])
        this.currentPage = Number(headers['x-pagination-current-page'])

        this.loading = false
      },
      deep: true
    },

    async currentPage(value) {
      this.loading = true

      const { headers } = await this.GET_CLOTHES_ITEMS({
        sellerId: this.ID,
        filters: this.filters,
        page: value
      })
      this.pageCount = Number(headers['x-pagination-page-count'])

      this.loading = false
    }
  },

  async mounted() {
    const { headers } = await this.GET_CLOTHES_ITEMS({
      sellerId: this.ID,
      filters: this.filters
    })
    this.pageCount = Number(headers['x-pagination-page-count'])

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
