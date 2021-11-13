<template>
  <div>
    <label v-if="content" class="input__label">
      {{ label }}
    </label>
    <div class="input__body">
      <input
        v-model="content"
        class="input"
        :type="type === 'password' ? currentType : type"
        :placeholder="label"
      />
      <button
        v-if="type === 'password'"
        class="input__eye-button"
        @click="switchCurrentType"
      >
        <Eye v-if="currentType === 'password'" width="24" />
        <EyeNo v-else width="24" />
      </button>
    </div>
  </div>
</template>

<script>
import Eye from '@/assets/sprite/eye.svg'
import EyeNo from '@/assets/sprite/eye-no.svg'

export default {
  name: 'Input',

  components: { Eye, EyeNo },

  props: {
    type: {
      type: String,
      default: 'text',
      validator: (value) => {
        return ['text', 'password'].includes(value)
      }
    },

    label: String,

    value: {
      type: String,
      required: true
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

    content(value) {
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

  &::placeholder {
    color: $primary;
  }

  &__label {
    text-transform: capitalize;
    color: $primary;
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
}
</style>
