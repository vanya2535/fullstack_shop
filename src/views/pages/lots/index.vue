<template>
  <div class="index">
    <header class="index__header">
      <Logo class="index__logo" width="137" />
      <Button>Add lot</Button>
    </header>
    <main class="index__main">
      <ClothesFilterList class="index__filter-list" />
      <ClothesItemList class="index__clothes-item-list" />
    </main>
    <!-- <footer class="index__footer">
      <div class="index__reviews-accordeon">reviews</div>
    </footer> -->
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

  computed: {
    ...mapGetters('user', ['ID'])
  },

  methods: {
    ...mapActions('clothesFilters', ['GET_CLOTHES_FILTERS']),
    ...mapActions('clothesItems', ['GET_CLOTHES_ITEMS'])
  },

  async mounted() {
    await this.GET_CLOTHES_FILTERS()
    await this.GET_CLOTHES_ITEMS(this.ID)
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

  &__clothes-item-list {
    margin-top: 21px;
  }

  &__reviews-accordeon {
    margin-top: 14px;
  }
}
</style>
