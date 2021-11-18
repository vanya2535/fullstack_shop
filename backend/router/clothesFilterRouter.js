const Router = require('express')
const { check } = require('express-validator')
const clothesFilterController = require('../controller/clothesFilterController.js')

const router = new Router()

router.get('/', clothesFilterController.getClothesFilters)
router.post(
  '/create',
  check(
    'value',
    'Clothes filter name length must be more than 2 and less than 33'
  ).isLength({ min: 3, max: 32 }),
  check(
    'type',
    'Type name length must be more than 2 and less than 33'
  ).isLength({ min: 3, max: 32 }),
  clothesFilterController.createClothesFilter
)

module.exports = router
