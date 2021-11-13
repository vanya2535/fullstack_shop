<template>
  <div class="card">
    <div class="card__header">
      <slot class="card__header" name="header" />
    </div>
    <div class="card__main">
      <slot class="card__main" name="main" />
    </div>
    <div class="card__footer">
      <slot class="card__footer" name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style lang="scss" scoped>
.card {
  @include border;

  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  overflow: visible;
  border-radius: 12px;
  padding: 20px;
  background: $white;
}
</style>
