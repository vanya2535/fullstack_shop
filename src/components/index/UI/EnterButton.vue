<template>
  <button class="enter-button" @click="$emit('click')">
    <h6>{{ innerText }}</h6>
  </button>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EnterButton',

  computed: {
    ...mapGetters('user', ['IS_LOGGED']),
    innerText() {
      return this.IS_LOGGED ? 'Go shopping' : 'Login'
    }
  }
}
</script>

<style lang="scss" scoped>
.enter-button {
  @include border;

  border-radius: 24px;
  padding: 10px 64px;
  color: $white;
  background-color: $primary;
}
</style>
