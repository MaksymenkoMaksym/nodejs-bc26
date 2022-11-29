const express = require('express')
const router = express.Router()
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserData,
  updateSubscription,
} = require('../../controllers/users')

const {
  validateUserData,
  auth,
  validateUserSubscription,
} = require('../../middleware')
router.post('/users/signup', validateUserData, registerUser)

router.post('/users/login', validateUserData, loginUser)

router.get('/users/logout', auth, logoutUser)

router.get('/users/current', auth, getUserData)

router.patch('/users', auth, validateUserSubscription, updateSubscription)

module.exports = router
