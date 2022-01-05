<template>
  <div
    class="input__wrapper"
    :class="{ input__wrapper_mt: !(error || content) }"
  >
    <label
      v-if="`${content}` || error"
      :class="`input__label` + ' ' + `${error ? 'input__label_error' : ''}`"
    >
      {{ error ? error : label }}
    </label>

    <div class="input__body">
      <input
        v-model="content"
        :class="`input__field input${error ? '_error' : ''}`"
        :type="type === 'password' ? currentType : type"
        :placeholder="label"
      />

      <button
        v-if="type === 'password'"
        type="button"
        class="input__eye-button"
        @click="switchCurrentType"
      >
        <SvgIcon v-if="currentType === 'password'" name="eye" />
        <SvgIcon v-else name="eye-no" width="24" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',

  props: {
    type: {
      type: [String, Number],
      default: 'text',
      validator: (value) => {
        return ['text', 'password', 'number'].includes(value)
      }
    },

    label: String,

    value: {
      type: [String, Number],
      required: true
    },

    error: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    content: '',
    currentType: 'password'
  }),

  watch: {
    value(value) {
      this.content = value
    },

    content(value, prev) {
      this.$emit('input', value)
    }
  },

  methods: {
    switchCurrentType() {
      this.currentType = ['text', 'password'].find(
        (type) => type !== this.currentType
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  @include border;

  border-radius: 4px;
  padding: 6px 8px;
  width: 100%;
  height: 36px;
  font-size: 18px;

  &_error {
    @include error-border;

    border-radius: 4px;
    padding: 6px 8px;
    width: 100%;
    height: 36px;
    font-size: 18px;
  }

  &::placeholder {
    color: $primary;
  }

  &__wrapper {
    text-align: start;

    &_mt {
      margin-top: 15.4px;
    }
  }

  &__label {
    margin-bottom: 2px;
    width: 100%;
    font-size: 14px;
    word-break: break-word;
    color: $primary;

    &_error {
      color: $error;
    }
  }

  &__body {
    display: flex;
  }

  &__eye-button {
    @include border;

    border-radius: 4px;
    height: 36px;
    min-width: 36px;
    background: $primary;
  }

  &__field[type='number']::-webkit-outer-spin-button,
  &__field[type='number']::-webkit-inner-spin-button {
    display: none;
  }
}
</style>
