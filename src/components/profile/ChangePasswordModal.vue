<template>
  <Dialog v-model="dialog">
    <Card>
      <template #header class="modal__header">
        <h5 class="modal__title">Change password</h5>
      </template>

      <template #main>
        <form class="modal__form" @submit.prevent @keydown.enter="onSubmit">
          <Input
            v-model="oldPassword"
            type="password"
            label="Old password"
            :error="errors.oldPassword"
            @input="resetErrors('oldPassword')"
          />

          <Input
            v-model="password"
            type="password"
            label="New password"
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
          <Button style="width: 59px" :disabled="processing" @click="onSubmit">
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
import dialog from '@/mixins/dialog.js'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ChangePasswordModal',

  mixins: [errors, dialog],

  data: () => ({
    processing: false,

    password: '',
    confirmPassword: '',
    oldPassword: '',

    errors: {
      password: '',
      confirmPassword: '',
      oldPassword: ''
    }
  }),

  computed: {
    ...mapState('user', ['_id'])
  },

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
          await this.CHANGE_PASSWORD({
            _id: this._id,
            password: this.password,
            oldPassword: this.oldPassword
          })

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
