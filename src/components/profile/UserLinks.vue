<template>
  <div class="link-list">
    <div
      v-for="(link, index) in linksArray"
      :key="index"
      class="link-list__item"
    >
      <SvgIcon :name="link" @click="redirect(link)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLinks',

  props: {
    links: {
      type: Object,
      required: true,
      validator: (value) => {
        let valid = true
        for (let key of Object.keys(value)) {
          valid = ['twitter', 'facebook', 'instagram'].includes(key)
        }
        return valid
      }
    }
  },

  computed: {
    linksArray() {
      return Object.keys(this.links).filter((link) => this.links[link])
    }
  },

  methods: {
    redirect(link) {
      window.open(this.links[link], '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.link-list {
  margin-top: 4px;

  &__item {
    display: inline-block;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 16px;
    }
  }
}
</style>
