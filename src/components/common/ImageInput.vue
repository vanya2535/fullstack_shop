<template>
  <div ref="inputWrapper" class="input" @click="$refs.input.click()">
    <div class="input__inner">
      <SvgIcon name="circle-plus" />
    </div>

    <input
      v-show="false"
      ref="input"
      type="file"
      accept="image/jpeg, image/jpg, image/png"
      @input="$emit('input', $event.target.files[0])"
    />
  </div>
</template>

<script>
export default {
  name: 'ImageInput',

  props: {
    preview: String
  },

  methods: {
    changeBackgroundImage(image) {
      this.$refs.inputWrapper.style.background = `url(${image})`
      this.$refs.inputWrapper.style.backgroundSize = '165px'
    }
  },

  watch: {
    preview(value) {
      this.changeBackgroundImage(value)
    }
  },

  mounted() {
    if (this.preview) {
      this.changeBackgroundImage(this.preview)
    } else {
      this.changeBackgroundImage(
        'https://secure.gravatar.com/avatar/50c30aae0f1878a17788458f7fefbcfe?s=252&d=mm&r=g'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  @include border;

  border-radius: 12px;
  width: 165px;
  height: 165px;
  cursor: pointer;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: $shadow;

    &:hover {
      background: $background-primary;
    }
  }
}
</style>
