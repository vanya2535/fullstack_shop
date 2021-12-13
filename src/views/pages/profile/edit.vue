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
        @input="avatar = $event"
      />

      <h5 class="index__username">
        {{
          USER.firstname && USER.lastname
            ? USER.firstname + ' ' + USER.lastname
            : USER.username
        }}
      </h5>

      <p v-if="USER.role" class="index__role">
        {{ USER.role.toLowerCase() }}
      </p>

      <div class="edit-form">
        <h6 class="edit-form__title">Personal data</h6>

        <Input
          v-model="formdata.firstname"
          label="Firstname"
          :error="errors.firstname"
          @input="resetErrors('firstname')"
        />

        <Input
          v-model="formdata.lastname"
          label="Lastname"
          :error="errors.lastname"
          @input="resetErrors('lastname')"
        />

        <Button
          style="margin-top: 8px"
          @click="isChangePasswordModalVisible = true"
        >
          Change password
        </Button>

        <h6 class="edit-form__title">Social links</h6>

        <div
          v-for="key of Object.keys(formdata.links)"
          :key="key"
          class="edit-form__section"
        >
          <SvgIcon class="edit-form__icon" :name="key" width="24" height="24" />

          <Input
            v-model="formdata.links[key]"
            :label="capitalize(key)"
            :error="errors.links[key]"
            @input="errors.links[key] = null"
          />
        </div>
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
          @click="$router.push({ name: 'Profile' })"
        >
          Cancel
        </Button>
      </div>
    </main>

    <DragModal v-model="dragover" />
    <ChangePasswordModal v-model="isChangePasswordModalVisible" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import errors from '@/mixins/errors'
import ChangePasswordModal from '@/components/profile/ChangePasswordModal.vue'
import DragModal from '@/components/profile/DragModal.vue'

export default {
  name: 'Edit',

  mixins: [errors],

  components: { ChangePasswordModal, DragModal },

  data: () => ({
    isChangePasswordModalVisible: false,
    processing: false,

    dragover: false,
    droppedImage: null,

    avatar:
      'https://secure.gravatar.com/avatar/50c30aae0f1878a17788458f7fefbcfe?s=252&d=mm&r=g',

    formdata: {
      firstname: '',
      lastname: '',
      links: {
        facebook: '',
        instagram: '',
        twitter: ''
      }
    },

    errors: {
      firstname: '',
      lastname: '',
      avatar: '',
      links: {
        facebook: '',
        instagram: '',
        twitter: ''
      }
    }
  }),

  computed: {
    ...mapGetters('user', ['USER', 'AVATAR']),

    inputPreview() {
      if (typeof this.avatar === 'string') {
        return this.avatar
      } else {
        return URL.createObjectURL(this.avatar)
      }
    }
  },

  methods: {
    ...mapActions('user', ['UPDATE_USER', 'UPDATE_AVATAR']),

    capitalize(word) {
      return word.slice(0, 1).toUpperCase() + word.slice(1)
    },

    async onSubmit() {
      this.processing = true
      try {
        if (this.avatar instanceof File) {
          await this.UPDATE_AVATAR({ _id: this.USER._id, avatar: this.avatar })
        }
        await this.UPDATE_USER({ _id: this.USER._id, ...this.formdata })
        this.$router.push({ name: 'Profile' })
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

  mounted() {
    this.$nextTick(() => {
      for (let key of ['_id', 'firstname', 'lastname']) {
        this.formdata[key] = this.USER[key] ? this.USER[key] : ''
      }

      if (this.AVATAR) {
        this.avatar = this.AVATAR
      }

      if (this.USER.links) {
        for (let key of Object.keys(this.USER.links)) {
          this.formdata.links[key] = this.USER.links[key]
        }
      }
    })
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

  &__username,
  &__role {
    text-transform: capitalize;
  }
}

.edit-form {
  display: inline-grid;
  grid-gap: 8px;

  &__title {
    margin: 20px auto 2px;
    color: $primary;
  }

  &__section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    :not(:first-of-type) {
      margin-top: 4px;
    }
  }

  &__icon {
    margin-right: 8px;
  }
}
</style>
