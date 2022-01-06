const { Schema, model } = require('mongoose')

const ClothesItem = new Schema({
  seller: { type: Object, required: true, ref: 'User' },
  image: String,
  name: { type: String, required: true },
  brand: String,
  price: { type: Number, required: true },
  filters: [{ type: String, ref: 'ClothesFilter' }],
  date: { type: Number, required: true }
})

module.exports = model('ClothesItem', ClothesItem)
