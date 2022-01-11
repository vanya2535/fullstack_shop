const { Schema, model } = require('mongoose')
const dayjs = require('dayjs')

const Message = new Schema({
  author: { type: String, required: true, ref: 'User' },
  dialog: { type: String, required: true, ref: 'Dialog' },
  body: { type: String, required: true },
  date: { type: Number, default: dayjs() },
  status: { type: String, default: 'UNREAD' }
})

module.exports = model('Message', Message)
