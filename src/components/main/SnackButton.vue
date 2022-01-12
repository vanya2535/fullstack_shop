<template>
  <button v-show="dialog" class="snack-button">
    <h6>Chat to the seller</h6>
  </button>
</template>

<script>
import dialog from '@/mixins/dialog'

export default {
  name: 'SnackButton',

  mixins: [dialog]
}
</script>

<style lang="scss" scoped>
.snack-button {
  @include border;

  position: absolute;
  left: calc(50vw - 155px);
  top: calc(100vh - 185px);
  z-index: 3;
  border-radius: 24px;
  width: 310px;
  height: 48px;
  color: $white;
  background: $primary;
  animation-name: slideup;
  animation-duration: 0.25s;
}

@keyframes slideup {
  from {
    top: calc(100vh - 175px);
    opacity: 0.25;
  }

  to {
    top: calc(100vh - 185px);
    opacity: 1;
  }
}
</style>
