<template>
  <Dialog v-model="dialog">
    <Card>
      <template #header class="modal__header">
        <h5 class="modal__title">{{ switchButtonText(isRegistred) }}</h5>
      </template>

      <template #main>
        <form class="modal__form" @submit.prevent>
          <Input v-model="formdata.username" label="Username" />
          <Input v-model="formdata.password" type="password" label="Password" />
          <Input
            v-if="!isRegistred"
            v-model="confirmPassword"
            type="password"
            label="Confirm password"
          >
          </Input>
        </form>
      </template>

      <template #footer>
        <div class="modal__footer">
          <Button>Enter</Button>
          <Button type="text" @click="isRegistred = !isRegistred">
            {{ switchButtonText(!isRegistred) }}
          </Button>
        </div>
      </template>
    </Card>
  </Dialog>
</template>

<script>
export default {
  name: 'EnterModal',

  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    dialog: false,
    isRegistred: true,

    passwordField: false,
    confirmPasswordField: false,

    formdata: {
      username: '',
      password: ''
    },

    confirmPassword: ''
  }),

  methods: {
    switchButtonText(isRegistred) {
      return isRegistred ? 'Login' : 'Register'
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
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>
