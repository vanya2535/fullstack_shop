<template>
  <Dialog v-model="dialog">
    <Card>
      <template #header class="modal__header">
        <h5 class="modal__title">{{ switchButtonText(loginMode) }}</h5>
      </template>

      <template #main>
        <form class="modal__form" @submit.prevent @keydown.enter="onSubmit">
          <Input
            v-model="formdata.username"
            label="Username"
            :error="errors.username"
            @input="resetErrors('username')"
          />

          <Input
            v-model="formdata.password"
            type="password"
            label="Password"
            :error="errors.password"
            @input="resetErrors('password')"
          />

          <Input
            v-if="!loginMode"
            v-model="confirmPassword"
            type="password"
            label="Confirm password"
            :error="errors.confirmPassword"
            @input="resetErrors('confirmPassword')"
          >
          </Input>

          <ToggleSwitch
            v-if="!loginMode"
            v-model="seller"
            label="I`m a seller"
          />
        </form>
      </template>

      <template #footer>
        <div class="modal__footer">
          <Button style="width: 59px" @click="onSubmit">
            <template v-if="!processing">Enter</template>
            <SpinLoading v-else />
          </Button>

          <Button type="text" @click="loginMode = !loginMode">
            {{ switchButtonText(!loginMode) }}
          </Button>
        </div>
      </template>
    </Card>
  </Dialog>
</template>

<script>
import { mapActions } from 'vuex'
import errors from '@/mixins/errors.js'
import dialog from '@/mixins/dialog.js'

export default {
  name: 'EnterModal',

  mixins: [errors, dialog],

  data: () => ({
    loginMode: true,
    processing: false,

    formdata: {
      username: '',
      password: '',
      roleId: '619017b123d430f2b4f912a5'
    },

    seller: false,

    confirmPassword: '',

    errors: {
      username: null,
      password: null,
      roleId: null,
      confirmPassword: null
    }
  }),

  methods: {
    ...mapActions('user', ['REGISTER', 'LOGIN']),

    switchButtonText(loginMode) {
      return loginMode ? 'Login' : 'Register'
    },

    async onSubmit() {
      this.processing = true
      this.resetErrors()

      if (!this.loginMode && this.formdata.password !== this.confirmPassword) {
        this.setErrors({
          field: 'confirmPassword',
          message: 'Passwords must be an equal'
        })
      } else {
        try {
          if (this.loginMode) {
            await this.LOGIN(this.formdata)
            this.$router.push({ name: 'Main' })
          } else {
            if (this.seller) {
              this.formdata.roleId = '6190181ac34f6215fde4bff9'
            } else {
              this.formdata.roleId = '619017b123d430f2b4f912a5'
            }

            await this.REGISTER(this.formdata)
            this.$router.push({ name: 'Main' })
          }
        } catch ({ response }) {
          console.log(response)
          if (response) {
            this.setErrors(response.data)
          }
        }
      }
      this.processing = false
    }
  },

  watch: {
    value(value) {
      if (value) {
        this.formdata = {
          username: '',
          password: '',
          roleId: '619017b123d430f2b4f912a5'
        }
        this.confirmPassword = ''
      }
    },

    loginMode(value) {
      if (!value) {
        this.confirmPassword = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  &__title {
    color: $primary;
  }

  &__form {
    @include modal-form;
  }

  &__footer {
    @include modal-footer;
  }
}
</style>
