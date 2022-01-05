<template>
  <button :class="`button button_${type}`" @click="onClick">
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
    },

    disabled: {
      Boolean,
      default: false
    }
  },

  methods: {
    onClick() {
      if (!this.disabled) {
        this.$emit('click')
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
    color: $primary;
    background: inherit;
  }
}
</style>
