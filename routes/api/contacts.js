const express = require('express')

const {
  get,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contacts')

const { loginUser, registerUser } = require('../../controllers/users')
const router = express.Router()

router.get('/contacts', get)

router.get('/contacts/:contactId', getById)
router.post('/contacts', addContact)

router.delete('/contacts/:contactId', removeContact)

router.put('/contacts/:contactId', updateContact)

router.put('/contacts/:contactId/favorite', updateStatusContact)

router.post('/users/signup', registerUser)
router.post('/users/login', loginUser)
module.exports = router
