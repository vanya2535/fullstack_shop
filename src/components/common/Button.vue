<template>
  <button :class="`button button_${type}`" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (value) => {
        return ['primary', 'text'].includes(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  font-size: 14px !important;

  &_primary {
    @include border;

    border-radius: 4px;
    padding: 6px 10px;
    color: $white;
    background: $primary;
  }

  &_text {
    border: none;
    background: inherit;
  }
}
</style>
