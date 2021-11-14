const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const User = require('../models/User.js')
const Role = require('../models/Role.js')

function standartedErrors(errors) {
  return errors.errors.map((e) => ({
    field: e.param,
    message: e.msg
  }))
}

function standartedUser(user) {
  return {
    _id: user._id,
    username: user.username,
    role: user.role
  }
}

class authController {
  async register(req, resp) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return resp.status(400).json(standartedErrors(errors))
      }

      const { username, password, roleId } = req.body

      const candidate = await User.findOne({ username })
      if (candidate) {
        return resp
          .status(400)
          .json({ field: 'username', message: 'User already exists' })
      }

      const role = await Role.findOne({ _id: roleId })
      if (!role) {
        return resp
          .status(400)
          .json({ field: 'roleId', message: 'Wrong user role' })
      }

      const hashPassword = bcrypt.hashSync(password, 7)
      const user = await new User({
        username,
        password: hashPassword,
        role: role.value
      })
      await user.save()
      return resp.json(standartedUser(user))
    } catch (e) {
      console.log(e)
      return resp.status(400).json({ message: 'Error during registration' })
    }
  }

  async login(req, resp) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return resp.status(400).json(standartedErrors(errors))
      }

      const { username, password } = req.body

      const user = await User.findOne({ username })
      if (!user) {
        return resp
          .status(400)
          .json({ field: 'username', message: 'User aren`t exists' })
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return resp
          .status(400)
          .json({ field: 'password', message: 'Wrong password' })
      }
      return resp.json({ ...standartedUser(user) })
    } catch (e) {
      console.log(e)
      return resp.status(400).json({ message: 'Error during logining' })
    }
  }
}

module.exports = new authController()
