<template>
  <div class="index">
    <header class="index__header">
      <Logo width="261" />
      <p>We always care customers</p>
    </header>
    <main class="index__main">
      <img
        src="https://secure.gravatar.com/avatar/50c30aae0f1878a17788458f7fefbcfe?s=252&d=mm&r=g"
        alt="profile picture"
        class="index__avatar"
      />

      <h5 class="index__username">
        {{ username }}
      </h5>

      <p class="index__role">
        {{ role }}
      </p>

      <div class="edit-form">
        <h6 class="edit-form__title">Personal data</h6>

        <Input
          v-model="formdata.firstName"
          label="Firstname"
          :error="errors.firstName"
        />

        <Input
          v-model="formdata.lastName"
          label="Lastname"
          :error="errors.lastName"
        />

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
            :error="errors.lastName"
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
            :error="errors.lastName"
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
            :error="errors.lastName"
          />
        </div>
      </div>

      <div>
        <Button
          class="index__button"
          style="margin-top: 20px"
          @click="onSubmit"
        >
          Confirm
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '@/assets/img/logo.svg'

export default {
  name: 'Edit',

  components: { Logo },

  data: () => ({
    links: ['facebook', 'instagram', 'twitter'],

    formdata: {
      firstName: '',
      lastName: '',
      links: {
        facebook: '',
        instagram: '',
        twitter: ''
      }
    },

    errors: {
      firstName: '',
      lastName: '',
      links: {
        facebook: '',
        instagram: '',
        twitter: ''
      }
    }
  }),

  computed: {
    ...mapState('user', ['username', 'role'])
  },

  methods: {
    onSubmit() {
      console.log(this.formdata)
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  padding-top: 64px;
  height: 100%;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $primary;
  }

  &__avatar {
    @include border;

    display: block;
    margin: 21px auto;
    border-radius: 12px;
    width: 165px;
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
  margin-top: 20px;

  &__title {
    margin: 8px auto 2px;
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
