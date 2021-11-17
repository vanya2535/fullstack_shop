const { Schema, model } = require('mongoose')

const User = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, ref: 'Role' },
  firstname: String,
  lastname: String,
  links: Object,
  avatar: String
})

module.exports = model('User', User)
