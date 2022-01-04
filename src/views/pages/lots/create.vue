<template>
  <div
    class="index"
    @dragover.prevent="dragover = true"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <Header />
    <main class="index__main">
      <ImageInput
        class="index__image-input"
        :preview="inputPreview"
        :droppedImage="droppedImage"
        @input="onImageInput"
      />

      <div class="edit-form">
        <Input
          v-model="formdata.name"
          label="Name"
          :error="errors.name"
          @input="resetErrors('name')"
        />

        <Input
          v-model="formdata.brand"
          label="Brand"
          :error="errors.brand"
          @input="resetErrors('brand')"
        />

        <Input
          v-model="formdata.price"
          label="Price"
          type="number"
          :error="errors.price"
          @input="resetErrors('price')"
        />

        <ClothesFilterList
          class="edit-form__filters"
          @select="onFilterSelect"
        />

        <ErrorBlock v-if="errors.image" :errorMessage="errors.image" />
        <ErrorBlock v-if="errors.filters" :errorMessage="errors.filters" />
      </div>

      <div>
        <Button
          class="index__button"
          style="margin-top: 20px"
          :disabled="processing"
          @click="onSubmit"
        >
          <template v-if="!processing">Confirm</template>
          <SpinLoading v-else />
        </Button>

        <Button
          class="index__button"
          type="text"
          style="margin-top: 20px"
          @click="$router.push({ name: 'Lots' })"
        >
          Cancel
        </Button>
      </div>
    </main>

    <DragModal v-model="dragover" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ClothesFilterList from '@/components/lots/ClothesFilterList'
import errors from '@/mixins/errors'

export default {
  name: 'Create',

  mixins: [errors],

  components: { ClothesFilterList },

  data: () => ({
    processing: false,

    dragover: false,
    droppedImage: null,

    formdata: {
      image:
        'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
      name: '',
      brand: '',
      price: 0,
      filters: []
    },

    errors: {
      name: '',
      brand: '',
      price: '',
      filters: '',
      image: ''
    }
  }),

  computed: {
    ...mapGetters('user', ['ID']),

    inputPreview() {
      if (this.formdata.image) {
        if (typeof this.formdata.image === 'string') {
          return this.formdata.image
        } else {
          return URL.createObjectURL(this.formdata.image)
        }
      }
      return ''
    }
  },

  methods: {
    ...mapActions('clothesFilters', ['GET_CLOTHES_FILTERS']),
    ...mapActions('clothesItems', ['CREATE_CLOTHES_ITEM']),

    onFilterSelect(selectedFilters) {
      this.formdata.filters = [...Object.values(selectedFilters)]
      this.errors.filters = null
    },

    onImageInput(image) {
      this.formdata.image = image
      this.errors.image = null
    },

    async onSubmit() {
      this.processing = true
      try {
        await this.CREATE_CLOTHES_ITEM({
          _id: this.ID,
          ...this.formdata,
          price: this.formdata.price ? Number(this.formdata.price) : ''
        })
        this.$router.push({ name: 'Lots' })
      } catch ({ response }) {
        this.processing = false
        console.log(response)
        if (response) {
          this.setErrors(response.data)
        }
      }
      this.processing = false
    },

    onDragLeave({ fromElement, toElement }) {
      if (!fromElement || !toElement) {
        this.dragover = false
      }
    },

    onDrop({ dataTransfer }) {
      this.dragover = false

      const file = dataTransfer.files[0]
      if (/\.(jpe?g|png)$/i.test(file.name)) {
        this.droppedImage = file
      }
    }
  },

  async mounted() {
    await this.GET_CLOTHES_FILTERS()
  }
}
</script>

<style lang="scss" scoped>
.index {
  @include padding;

  &__image-input {
    margin: 21px auto;
  }

  &__main {
    text-align: center;
    color: $primary;
  }

  &__button {
    display: block;
    margin: 0 auto;
  }
}

.edit-form {
  display: inline-grid;
  grid-gap: 8px;
  width: 283px;

  &__filters {
    justify-content: center;
    margin-top: 4px;
  }
}
</style>
