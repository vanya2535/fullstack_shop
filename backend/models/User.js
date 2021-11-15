const mongoose = require('mongoose')

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, ref: 'Role' },
  firstname: String,
  lastname: String,
  links: {
    Object,
    default: {
      twitter: '',
      facebook: '',
      instagram: ''
    }
  },
  avatar: String
})

module.exports = mongoose.model('User', User)
