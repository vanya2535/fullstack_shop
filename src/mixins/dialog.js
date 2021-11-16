export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    dialog: false
  }),

  watch: {
    value(value) {
      this.dialog = value
    },

    dialog(value) {
      this.$emit('input', value)
    }
  }
}
