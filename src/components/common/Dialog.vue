<template>
  <div v-if="dialog" class="dialog" @click="dialog = false">
    <div class="dialog__inner" @click.stop>
      <slot />
    </div>
  </div>
</template>

<script>
import dialog from '@/mixins/dialog.js'

export default {
  name: 'Dialog',

  mixins: [dialog]
}
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3;
  display: flex;
  background: $background;

  &__inner {
    display: inline-block;
    margin: auto;
    min-height: 50px;
    max-width: 640px;
  }
}
</style>
