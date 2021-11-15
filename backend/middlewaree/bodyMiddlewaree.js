module.exports = function (fields) {
  return function (req, resp, next) {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const errors = []
      for (let field of fields) {
        if (req.body[field] === undefined) {
          errors.push({
            field,
            message: field + ' is required'
          })
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
        .json({ message: 'Error during request body check' })
    }
  }
}
