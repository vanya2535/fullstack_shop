<template>
  <div id="app">
    <router-view />
    <FooterNavbar v-if="$route.name !== 'Index'" />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'App',

  methods: {
    ...mapActions('user', ['GET_USER_INFO']),
    ...mapMutations('user', ['SET_USER_DATA'])
  },

  mounted() {
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData) {
      this.SET_USER_DATA(userData)
      this.GET_USER_INFO(userData._id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./assets/scss/core/app.scss');
</style>
