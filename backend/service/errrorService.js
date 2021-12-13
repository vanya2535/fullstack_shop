class ErrorService {
  standartedErrors(errors) {
    return errors.errors.map((e) => ({
      field: e.param,
      message: e.msg
    }))
  }
}

module.exports = new ErrorService()
