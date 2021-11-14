<template>
  <div class="toggle-switch__wrapper">
    <p class="toggle-switch__label">{{ label }}</p>
    <div class="toggle-switch" @click="active = !active">
      <div
        ref="switch"
        :class="`toggle-switch__body ${
          active ? 'toggle-switch__body_active' : 'toggle-switch__body_inactive'
        }`"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleSwitch',

  props: {
    value: {
      type: Boolean,
      required: true
    },

    label: String
  },

  data: () => ({
    active: false
  }),

  watch: {
    value(value) {
      this.active = value
    },

    active(value, prev) {
      this.$emit('input', value)
      if (value) {
        this.$refs.switch.animate(
          [
            { marginLeft: '0' },
            {
              marginLeft: '20px'
            }
          ],
          {
            duration: 150
          }
        )
      } else if (prev) {
        this.$refs.switch.animate(
          [
            { marginLeft: '20px' },
            {
              marginLeft: '0'
            }
          ],
          {
            duration: 150
          }
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle-switch {
  @include border;

  border-radius: 16px;
  padding: 1px 2px;
  width: 48px;
  background: $white;
  cursor: pointer;

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__label {
    margin-right: 8px;
  }

  &__body {
    @include border;

    border-radius: 50%;
    width: 24px;
    height: 24px;
    background: $white;

    &_active {
      margin-left: 20px;
      background: $primary;
    }
  }
}
</style>
