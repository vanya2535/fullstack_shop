module.exports = function (req, resp, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization
    console.log(req.body, req.headers)
    if (!token || token !== req.body._id) {
      return resp.status(403).json({ message: 'Not authorized' })
    }

    next()
  } catch (e) {
    console.log(e)
    return resp.status(403).json({ message: 'Not authorized' })
  }
}
