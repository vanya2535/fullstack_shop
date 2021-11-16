<template>
  <div
    class="index"
    @dragover.prevent="dragover = true"
    @dragleave="dragover = false"
    @drop.prevent="onDrop"
  >
    <header class="index__header">
      <Logo width="261" />
      <p>We always care customers</p>
    </header>
    <main class="index__main">
      <ImageInput
        class="index__image-input"
        :preview="inputPreview"
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
        />

        <Input
          v-model="formdata.lastname"
          label="Lastname"
          :error="errors.lastname"
        />

        <Button
          style="margin-top: 8px"
          @click="isChangePasswordModalVisible = true"
        >
          Change password
        </Button>

        <h6 class="edit-form__title">Social links</h6>

        <div class="edit-form__section">
          <SvgIcon
            class="edit-form__icon"
            name="facebook"
            width="24"
            height="24"
          />

          <Input
            v-model="formdata.links.facebook"
            label="Facebook"
            :error="errors.links.facebook"
          />
        </div>

        <div class="edit-form__section">
          <SvgIcon
            class="edit-form__icon"
            name="instagram"
            width="24"
            height="24"
          />

          <Input
            v-model="formdata.links.instagram"
            label="Instagram"
            :error="errors.links.instagram"
          />
        </div>

        <div class="edit-form__section">
          <SvgIcon
            class="edit-form__icon"
            name="twitter"
            width="24"
            height="24"
          />

          <Input
            v-model="formdata.links.twitter"
            label="Twitter"
            :error="errors.links.twitter"
          />
        </div>
      </div>

      <div>
        <Button
          class="index__button"
          style="margin-top: 20px"
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
import Logo from '@/assets/img/logo.svg'
import ChangePasswordModal from '@/components/profile/ChangePasswordModal.vue'
import DragModal from '@/components/profile/DragModal.vue'

export default {
  name: 'Edit',

  mixins: [errors],

  components: { Logo, ChangePasswordModal, DragModal },

  data: () => ({
    isChangePasswordModalVisible: false,
    processing: false,

    dragover: false,

    avatar: '',

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

    async onSubmit() {
      this.processing = true
      try {
        if (this.avatar instanceof File) {
          await this.UPDATE_AVATAR({ _id: this.USER._id, avatar: this.avatar })
        }
        await this.UPDATE_USER({ _id: this.USER._id, ...this.formdata })
        this.$router.push({ name: 'Profile' })
      } catch ({ response }) {
        console.log(response)
        if (response) {
          this.setErrors(response.data)
        }
      }
      this.processing = false
    },

    onDrop({ dataTransfer }) {
      this.dragover = false
      console.log(dataTransfer, dataTransfer.files[0])

      const file = dataTransfer.files[0]
      if (/\.(jpe?g|png)$/i.test(file.name)) {
        this.avatar = file
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

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $primary;
  }

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
