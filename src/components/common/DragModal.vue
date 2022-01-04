<template>
  <Dialog v-model="dialog" class="modal">
    <Card>
      <template #header>
        <h5>Drop this here</h5>
      </template>
      <template #main>
        <div class="modal__drop-zone" />
      </template>
    </Card>
  </Dialog>
</template>

<script>
import dialog from '@/mixins/dialog.js'

export default {
  name: 'DragModal',

  mixins: [dialog]
}
</script>

<style lang="scss" scoped>
.modal {
  color: $primary;
  pointer-events: none;

  &__drop-zone {
    border: 4px dashed $primary;
    width: 400px;
    height: 400px;
  }
}
</style>
