const { Schema, model } = require('mongoose')

const Dialog = new Schema({
  users: [{ type: String, ref: 'User' }],
  messages: [{ type: Object, ref: 'Message', default: [] }]
})

module.exports = model('Dialog', Dialog)
