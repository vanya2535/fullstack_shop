const Router = require('express')
const { check } = require('express-validator')
const authController = require('../controller/authController.js')
const authMiddlewaree = require('../middlewaree/authMiddlewaree.js')
const bodyMiddlewaree = require('../middlewaree/bodyMiddlewaree.js')

const router = new Router()

router.post(
  '/register',
  check('username', 'Username cannot be empty').notEmpty(),
  check('roleId', 'Role cannot be empty').notEmpty(),
  check(
    'password',
    'Password length must be more than 5 and less than 17'
  ).isLength({ min: 6, max: 16 }),
  bodyMiddlewaree(['username', 'password', 'roleId']),
  authController.register
)

router.post(
  '/login',
  check('username', 'Username cannot be empty').notEmpty(),
  check(
    'password',
    'Password length must be more than 5 and less than 17'
  ).isLength({ min: 6, max: 16 }),
  bodyMiddlewaree(['username', 'password']),
  authController.login
)

router.patch(
  '/update',
  authMiddlewaree,
  check('firstname', 'Firstname cannot be empty').notEmpty(),
  check('lastname', 'Lastname cannot be empty').notEmpty(),
  bodyMiddlewaree(['_id', 'firstname', 'lastname']),
  authController.update
)

router.patch(
  '/change-password',
  authMiddlewaree,
  check(
    'password',
    'Password length must be more than 5 and less than 17'
  ).isLength({ min: 6, max: 16 }),
  bodyMiddlewaree(['_id', 'password', 'oldPassword']),
  authController.changePassword
)

module.exports = router
