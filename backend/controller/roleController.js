const { validationResult } = require('express-validator')
const Role = require('../models/Role.js')

class roleController {
  async getRoles(req, resp) {
    try {
      const roles = await Role.find()
      return resp.json(roles)
    } catch (e) {
      console.log(e)
      return resp.status(400).json({ message: 'Error during getting roles' })
    }
  }

  async createRole(req, resp) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return resp.status(400).json(errors)
      }

      const { value } = req.body
      const candidate = await Role.findOne({ value })
      if (candidate) {
        return resp.status(400).json({ message: 'Role already exists' })
      }
      const role = await new Role({ value })
      role.save()
      return resp.json(role)
    } catch (e) {
      console.log(e)
      return resp.status(400).json({ message: 'Error during getting roles' })
    }
  }
}

module.exports = new roleController()
