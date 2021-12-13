<template>
  <div class="error-block">
    <h6>{{ errorMessage }}</h6>
  </div>
</template>

<script>
export default {
  name: 'ErrorBlock',

  props: {
    errorMessage: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.error-block {
  @include error-border;

  margin: 0 auto;
  border-radius: 8px;
  padding: 10px 12px;
  text-align: center;
  color: $white;
  background: $error;
}
</style>
