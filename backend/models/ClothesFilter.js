const { Schema, model } = require('mongoose')

const ClothesFilter = new Schema({
  value: { type: String, unique: true }
})

module.exports = model('ClothesFilter', ClothesFilter)
