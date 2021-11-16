<template>
  <div class="index">
    <header class="index__header">
      <Logo width="261" />
      <p>We always care customers</p>
    </header>
    <main class="index__main">
      <ImageInput
        class="index__image-input"
        :preview="inputPreview"
        @input="formdata.avatar = $event"
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
    <ChangePasswordModal v-model="isChangePasswordModalVisible" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import errors from '@/mixins/errors'
import Logo from '@/assets/img/logo.svg'
import ChangePasswordModal from '@/components/profile/ChangePasswordModal.vue'

export default {
  name: 'Edit',

  mixins: [errors],

  components: { Logo, ChangePasswordModal },

  data: () => ({
    isChangePasswordModalVisible: false,
    processing: false,

    formdata: {
      firstname: '',
      lastname: '',
      avatar: '',
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
      if (typeof this.formdata.avatar === 'string') {
        return this.formdata.avatar
      } else {
        return URL.createObjectURL(this.formdata.avatar)
      }
    }
  },

  methods: {
    ...mapActions('user', ['UPDATE_USER']),

    async onSubmit() {
      this.processing = true
      try {
        await this.UPDATE_USER({ _id: this.USER._id, ...this.formdata })
        this.$router.push({ name: 'Profile' })
      } catch ({ response }) {
        console.log(response)
        if (response) {
          this.setErrors(response.data)
        }
      }
      this.processing = false
    }
  },

  mounted() {
    this.$nextTick(() => {
      for (let key of ['_id', 'firstname', 'lastname']) {
        this.formdata[key] = this.USER[key] ? this.USER[key] : ''
      }

      if (this.AVATAR) {
        this.formdata.avatar = this.AVATAR
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
    text-transform: capitalize;
    color: $primary;
  }

  &__button {
    display: block;
    margin: 0 auto;
  }
}

.edit-form {
  display: inline-grid;

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
