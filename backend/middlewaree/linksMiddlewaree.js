module.exports = function (req, resp, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const { links } = req.body

    const validationFailes = []
    const urlRe =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ //eslint-disable-line

    for (let key of Object.keys(links).filter((link) => links[link].length)) {
      if (!urlRe.test(links[key])) {
        validationFailes.push({
          field: key,
          message: 'It`s not a link'
        })
      }
    }

    if (validationFailes.length) {
      return resp.status(400).json({ field: 'links', errors: validationFailes })
    }

    next()
  } catch (e) {
    console.log(e)
    return resp.status(400).json({ message: 'Error during links checking' })
  }
}
