<template>
  <div id="app">
    <router-view />
    <FooterNavbar v-if="$route.name !== 'Index'" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'App',

  methods: {
    ...mapMutations('user', ['SET_USER_DATA'])
  },

  mounted() {
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData) {
      this.SET_USER_DATA(userData)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./assets/scss/core/app.scss');
</style>
