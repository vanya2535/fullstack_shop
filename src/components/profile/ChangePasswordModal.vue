<template>
  <Dialog v-model="dialog">
    <Card>
      <template #header class="modal__header">
        <h5 class="modal__title">Change password</h5>
      </template>

      <template #main>
        <form class="modal__form" @submit.prevent>
          <Input
            v-model="password"
            type="password"
            label="Password"
            :error="errors.password"
            @input="resetErrors('password')"
          />

          <Input
            v-model="confirmPassword"
            type="password"
            label="Confirm password"
            :error="errors.confirmPassword"
            @input="resetErrors('confirmPassword')"
          >
          </Input>
        </form>
      </template>

      <template #footer>
        <div class="modal__footer">
          <Button style="width: 59px" @click="onSubmit">
            <template v-if="!processing">Enter</template>
            <SpinLoading v-else />
          </Button>

          <Button type="text" @click="dialog = false">Cancel</Button>
        </div>
      </template>
    </Card>
  </Dialog>
</template>

<script>
import errors from '@/mixins/errors.js'
import { mapActions } from 'vuex'

export default {
  name: 'ChangePasswordModal',

  mixins: [errors],

  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    dialog: false,
    processing: false,

    password: '',
    confirmPassword: '',

    errors: {
      password: '',
      confirmPassword: ''
    }
  }),

  methods: {
    ...mapActions('user', ['CHANGE_PASSWORD']),

    async onSubmit() {
      this.processing = true
      this.resetErrors()

      if (this.password !== this.confirmPassword) {
        this.setErrors({
          field: 'confirmPassword',
          message: 'Passwords must be an equal'
        })
      } else {
        try {
          await this.CHANGE_PASSWORD(this.password)
          this.dialog = false
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
      this.dialog = value
    },

    dialog(value) {
      this.$emit('input', value)
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
