const Router = require('express')
const { check } = require('express-validator')
const authController = require('../controller/authController.js')
const authMiddlewaree = require('../middlewaree/authMiddlewaree.js')
const bodyMiddlewaree = require('../middlewaree/bodyMiddlewaree.js')
const linksMiddlewaree = require('../middlewaree/linksMiddlewaree.js')

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

router.get('/:id', authController.getUserInfo)

router.patch(
  '/update',
  authMiddlewaree,
  check('firstname', 'Firstname cannot be empty').notEmpty(),
  check('lastname', 'Lastname cannot be empty').notEmpty(),
  bodyMiddlewaree(['firstname', 'lastname']),
  linksMiddlewaree,
  authController.update
)

router.patch(
  '/change-password',
  authMiddlewaree,
  check(
    'password',
    'Password length must be more than 5 and less than 17'
  ).isLength({ min: 6, max: 16 }),
  bodyMiddlewaree(['password', 'oldPassword']),
  authController.changePassword
)

router.patch('/update-avatar', authMiddlewaree, authController.updateAvatar)

module.exports = router
