const { Types } = require('mongoose')
const fileService = require('../service/fileService.js')
const ClothesItem = require('../models/ClothesItem.js')
const ClothesFilter = require('../models/ClothesFilter.js')
const ClothesItemService = require('../service/clothesItemService.js')

class ClothesItemController {
  async createClothesItem(req, resp) {
    try {
      const { _id, name, brand, price, filters } = req.body
      const image = req.files.image

      const seller = await ClothesItemService.getSellerData(_id)
      if (!seller) {
        return resp
          .status(404)
          .json({ field: _id, message: 'User is not found' })
      }

      const imageName = fileService.saveFile(image)

      const parsedFilters = JSON.parse(filters)
      if (price < 1) {
        return resp
          .status(400)
          .json({ field: 'price', message: 'Price cannot be less than 1$' })
      } else if (price < 100) {
        parsedFilters.push('61967e854e34210924fb1113')
      } else if (price < 200) {
        parsedFilters.push('61967e854e34210924fb1115')
      } else if (price < 450) {
        parsedFilters.push('61967e854e34210924fb1117')
      } else if (price > 450) {
        parsedFilters.push('61967e854e34210924fb1119')
      }

      const valuedFilters = []
      for (let id of parsedFilters) {
        const filter = await ClothesFilter.findById(id)
        if (filter) {
          valuedFilters.push(filter.value)
        }
      }

      const clothesItem = await new ClothesItem({
        seller,
        image: imageName,
        name,
        brand,
        price,
        filters: valuedFilters
      })
      await clothesItem.save()
      return resp.json(clothesItem)
    } catch (e) {
      console.log(e)
      return resp
        .status(400)
        .json({ message: 'Error during creating clothes item' })
    }
  }

  async getClothesItems(req, resp) {
    try {
      const sellerId = req.query.sellerId
      if (sellerId) {
        const clothesItems = await ClothesItem.find({
          'seller._id': Types.ObjectId(sellerId)
        })
        return resp.json(clothesItems)
      }

      const clothesItems = await ClothesItem.find()
      return resp.json(clothesItems)
    } catch (e) {
      console.log(e)
      return resp
        .status(400)
        .json({ message: 'Error during getting clothes items' })
    }
  }

  async getClothesItemInfo(req, resp) {
    try {
      const clothesItem = await ClothesItem.findById(req.params.id)

      if (!clothesItem) {
        return resp
          .status(404)
          .json({ field: 'id', message: 'Clothes item is not found' })
      }
      return resp.json(clothesItem)
    } catch (e) {
      console.log(e)
      return resp
        .status(400)
        .json({ message: 'Error during getting clothes item info' })
    }
  }

  async deleteClothesItem(req, resp) {
    try {
      const { id } = req.params

      const clothesItem = await ClothesItem.findById(id)
      if (clothesItem.seller !== req.headers.authorization) {
        return resp.status(403).json({ message: 'Not authorized' })
      }

      await clothesItem.remove()
      fileService.removeFile(clothesItem.image)
      return resp.json(id)
    } catch (e) {
      console.log(e)
      return resp
        .status(400)
        .json({ message: 'Error during deleting clothes item' })
    }
  }
}

module.exports = new ClothesItemController()
