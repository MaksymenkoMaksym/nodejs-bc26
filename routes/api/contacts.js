const express = require('express')

const {
  get,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers')
const router = express.Router()

router.get('/contacts', get)

router.get('/contacts/:contactId', getById)
router.post('/contacts', addContact)

router.delete('/contacts/:contactId', removeContact)

router.put('/contacts/:contactId', updateContact)

router.put('/contacts/:contactId/favorite', updateStatusContact)
module.exports = router
