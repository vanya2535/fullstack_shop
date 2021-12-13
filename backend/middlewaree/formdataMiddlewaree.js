function createErrorObject({ value }) {
  return {
    field: value,
    message: value + ' is required'
  }
}

module.exports = function (fields) {
  return function (req, resp, next) {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const errors = []
      for (let field of fields) {
        console.log(field)
        switch (field.type) {
          case 'file':
            if (!req.files?.[field.value]) {
              errors.push(createErrorObject(field))
            }
            break
          case 'array':
            if (
              !JSON.parse(req.body[field.value]).filter((item) => item).length
            ) {
              errors.push(createErrorObject(field))
            }
            break
          default:
            if (!req.body[field.value]) {
              errors.push(createErrorObject(field))
            }
        }
      }

      if (errors.length) {
        resp.status(400).json(errors)
      }

      next()
    } catch (e) {
      console.log(e)
      return resp
        .status(400)
        .json({ message: 'Error during request formdata check' })
    }
  }
}
