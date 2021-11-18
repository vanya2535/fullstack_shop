const { Schema, model } = require('mongoose')

const ClothesFilter = new Schema({
  value: { type: String, unique: true },
  type: { type: String, required: true }
})

module.exports = model('ClothesFilter', ClothesFilter)
