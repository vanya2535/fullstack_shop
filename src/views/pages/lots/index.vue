<template>
  <div class="index">
    <header class="index__header">
      <Logo class="index__logo" width="137" />
      <Button>Add lot</Button>
    </header>
    <main class="index__main">
      <ClothesFilterList class="index__filter-list" />
      <div class="index__clothes-item-list">clothes items</div>
    </main>
    <footer class="index__footer">
      <div class="index__reviews-accordeon">reviews</div>
    </footer>
  </div>
</template>

<script>
import Logo from '@/assets/img/logo.svg'
import { mapActions } from 'vuex'
import ClothesFilterList from '@/components/lots/ClothesFilterList'

export default {
  name: 'Index',

  components: { Logo, ClothesFilterList },

  methods: {
    ...mapActions('clothesFilter', ['GET_CLOTHES_FILTERS'])
  },

  async mounted() {
    await this.GET_CLOTHES_FILTERS()
  }
}
</script>

<style lang="scss" scoped>
.index {
  @include padding;

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__logo {
    margin-right: 80px;
  }

  &__main {
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
