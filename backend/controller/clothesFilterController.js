const { validationResult } = require('express-validator')
const ClothesFilter = require('../models/ClothesFilter.js')

class clothesFilterContoller {
  async getClothesFilters(req, resp) {
    try {
      const { type } = req.query
      if (type) {
        const filters = await ClothesFilter.find({ type })
        return resp.json(filters)
      }

      const filters = await ClothesFilter.find({ type: ['sex', 'clothes'] })
      return resp.json(filters)
    } catch (e) {
      console.log(e)
      return resp
        .status(400)
        .json({ message: 'Error during getting clothes filters' })
    }
  }

  async createClothesFilter(req, resp) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return resp.status(400).json(errors)
      }

      const { value, type } = req.body

      const candidate = await ClothesFilter.findOne({ value })
      if (candidate) {
        return resp
          .status(400)
          .json({ message: 'Clothes filter already exists' })
      }

      const clothesFilter = await new ClothesFilter({ value, type })
      await clothesFilter.save()

      return resp.json(clothesFilter)
    } catch (e) {
      console.log(e)
      return resp
        .status(400)
        .json({ message: 'Error during creating clothes filter' })
    }
  }
}

module.exports = new clothesFilterContoller()
