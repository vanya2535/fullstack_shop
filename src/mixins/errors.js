export default {
  methods: {
    setErrors(errors) {
      if (Array.isArray(errors)) {
        for (let e of errors) {
          this.errors[e.field] = e.message
        }
      } else {
        this.errors[errors.field] = errors.message
      }
    },

    resetErrors(fields) {
      if (typeof fields === 'string') {
        this.errors[fields] = null
      } else {
        if (fields) {
          for (let field of fields) {
            this.errors[field] = null
          }
        } else {
          for (let e of Object.keys(this.errors)) {
            this.errors[e] = null
          }
        }
      }
    }
  }
}
