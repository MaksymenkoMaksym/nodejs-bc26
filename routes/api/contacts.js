const express = require('express')

const {
  get,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contacts')

const {
  loginUser,
  registerUser,
  auth,
  logoutUser,
  getUserData,
} = require('../../controllers/users')
const router = express.Router()

router.get('/contacts', auth, get)

router.get('/contacts/:contactId', auth, getById)
router.post('/contacts', auth, addContact)

router.delete('/contacts/:contactId', auth, removeContact)

router.put('/contacts/:contactId', auth, updateContact)

router.put('/contacts/:contactId/favorite', auth, updateStatusContact)

// login / register

router.get('/contacts', auth, (req, res, next) => {
  const { email } = req.user
  res.json({
    status: 'success',
    code: 200,
    data: {
      message: `Authorization was successful: ${email}`,
    },
  })
})

router.post('/users/signup', registerUser)

router.post('/users/login', loginUser)

router.get('/users/logout', auth, logoutUser)

router.get('/users/current', auth, getUserData)

module.exports = router
