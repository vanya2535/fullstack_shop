const { Router } = require('express')
const { check } = require('express-validator')
const ClothesItemController = require('../controller/clothesItemController.js')
const authMiddlewaree = require('../middlewaree/authMiddlewaree.js')
const formdataMiddlewaree = require('../middlewaree/formdataMiddlewaree.js')

const router = new Router()

router.get('/', ClothesItemController.getClothesItems)
router.get('/:id', ClothesItemController.getClothesItemInfo)

const requiredFields = [
  { value: 'name' },
  { value: 'brand' },
  { value: 'price' },
  { value: 'image', type: 'file' },
  { value: 'filters', type: 'array' }
]
router.post(
  '/create',
  authMiddlewaree,
  formdataMiddlewaree(requiredFields),
  check('name', 'Name length must be more than 3 and less than 65').isLength({
    min: 4,
    max: 64
  }),
  check('brand', 'Brand length must be more than 3 and less than 33').isLength({
    min: 4,
    max: 32
  }),
  ClothesItemController.createClothesItem
)

router.delete('/delete/:id', ClothesItemController.deleteClothesItem)

module.exports = router
