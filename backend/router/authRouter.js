const Router = require('express')
const { check } = require('express-validator')
const authController = require('../controller/authController.js')

const router = new Router()

router.post(
  '/register',
  check('username', 'Username cannot be empty').notEmpty(),
  check('roleId', 'Role cannot be empty').notEmpty(),
  check(
    'password',
    'Password length must be more than 5 and less than 17'
  ).isLength({ min: 6, max: 16 }),
  authController.register
)

router.post(
  '/login',
  check('username', 'Username cannot be empty').notEmpty(),
  check(
    'password',
    'Password length must be more than 5 and less than 17'
  ).isLength({ min: 6, max: 16 }),
  authController.login
)

module.exports = router
