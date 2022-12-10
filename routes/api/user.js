const express = require('express')
const router = express.Router()
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserData,
  updateSubscription,
  getAvatar,
  verifyToken,
  verifyRepeat,
} = require('../../controllers/users')

const {
  validateUserData,
  auth,
  validateUserSubscription,
} = require('../../middleware')
const { editAvatar } = require('../../middleware/avatarMiddleware')
const upload = require('../../middleware/setAvatarMiddleware')

router.post('/users/signup', validateUserData, registerUser)

router.post('/users/login', validateUserData, loginUser)

router.get('/users/logout', auth, logoutUser)

router.get('/users/current', auth, getUserData)

router.patch('/users', auth, validateUserSubscription, updateSubscription)

router.patch(
  '/users/avatars',
  auth,
  upload.single('avatar'),
  editAvatar,
  getAvatar,
)

router.get('/users/verify/:verificationToken', verifyToken)

router.post('/users/verify/', verifyRepeat)

module.exports = router
