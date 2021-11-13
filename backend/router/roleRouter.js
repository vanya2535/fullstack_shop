const Router = require('express')
const { check } = require('express-validator')
const roleController = require('../controller/roleController.js')

const router = new Router()

router.get('/', roleController.getRoles)
router.post(
  '/create',
  check(
    'value',
    'Role name length must be more than 3 and less than 33'
  ).isLength({ min: 4, max: 32 }),
  roleController.createRole
)

module.exports = router
