<template>
  <div class="list">
    <div
      v-for="item of CLOTHES_ITEMS"
      :key="item._id"
      class="list__item"
      :class="{ list__item_selected: item._id === selectedItem }"
    >
      <img
        :src="`http://localhost:3000/${item.image}`"
        :alt="`item ${item._id} image`"
        class="item__image"
      />

      <div class="item__info">
        <h6 class="item__name">{{ item.name }}</h6>
        <p class="item__brand">{{ item.brand }}</p>
        <h6 class="item__price">${{ item.price }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ClothesItemList',

  data: () => ({
    selectedItem: ''
  }),

  computed: {
    ...mapGetters('clothesItems', ['CLOTHES_ITEMS'])
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 8px;

  &__item {
    display: flex;
    align-items: center;
    border-radius: 12px;
    padding: 13px 18px;
    width: 311px;
    box-shadow: 0 4px 4px $shadow;
    background: $white-contrast;

    &_selected {
      background: $status;
    }
  }
}

.item {
  &__image {
    margin-right: 24px;
    border-radius: 12px;
    width: 94px;
    height: 94px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    text-align: left;
  }

  &__name {
    color: $name;
  }

  &__brand {
    font-size: 16px;
    color: $brand;
  }

  &__price {
    color: $primary;
  }

  &__name,
  &__price {
    font-size: 18px;
  }
}
</style>
