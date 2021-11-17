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
      @input="onInput"
    />

    <Dialog v-model="dialog">
      <Card>
        <template #header>
          <h5 class="modal__title">Choose visible area of your avatar</h5>
        </template>

        <template #main>
          <cropper
            ref="cropper"
            class="modal__cropper"
            :src="image"
            :stencil-props="{
              handlers: {},
              movable: false,
              scalable: false,
              aspectRatio: 1
            }"
            :resize-image="{
              adjustStencil: false
            }"
            image-restriction="stencil"
          />
        </template>

        <template #footer>
          <div class="modal__buttons">
            <Button @click="crop">Ok</Button>

            <Button type="text" @click="dialog = false">Cancel</Button>
          </div>
        </template>
      </Card>
    </Dialog>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export default {
  name: 'ImageInput',

  components: { Cropper },

  props: {
    preview: String,
    droppedImage: File
  },

  data: () => ({
    dialog: false,

    image: null
  }),

  methods: {
    changeBackgroundImage(image) {
      this.$refs.inputWrapper.style.background = `url(${image})`
      this.$refs.inputWrapper.style.backgroundSize = '165px'
    },

    onInput({ target }) {
      this.image = URL.createObjectURL(target.files[0])
      this.dialog = true
    },

    crop() {
      const { canvas } = this.$refs.cropper.getResult()
      const dataURL = canvas.toDataURL('image/jpg')

      let arr = dataURL.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      let extension = mime.split('/')
      let avaFile = new File([u8arr], `avatar.${extension[1]}`, { type: mime })

      this.$emit('input', avaFile)
      this.dialog = false
    }
  },

  watch: {
    preview(value) {
      this.changeBackgroundImage(value)
    },

    droppedImage(value) {
      if (value) {
        this.image = URL.createObjectURL(value)
        this.dialog = true
      }
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
