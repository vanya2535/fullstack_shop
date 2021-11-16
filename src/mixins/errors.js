export default {
  methods: {
    setErrors(errors) {
      if (Array.isArray(errors)) {
        for (let e of errors) {
          this.errors[e.field] = e.message
        }
      } else {
        if (errors.message) {
          this.errors[errors.field] = errors.message
        } else {
          for (let error of errors.errors) {
            this.errors[errors.field][error.field] = error.message
          }
        }
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
