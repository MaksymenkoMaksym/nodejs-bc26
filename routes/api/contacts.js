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

router.get('/contacts', get)

router.get('/contacts/:contactId', getById)
router.post('/contacts', addContact)

router.delete('/contacts/:contactId', removeContact)

router.put('/contacts/:contactId', updateContact)

router.put('/contacts/:contactId/favorite', updateStatusContact)

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
router.get(' /users/current', auth, getUserData)
module.exports = router
