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
  auth,
  validateStatusContact,
  validateContact,
} = require('../../middleware')
const router = express.Router()

router.get('/contacts', auth, get)

router.get('/contacts/:contactId', auth, getById)
router.post('/contacts', auth, validateContact, addContact)

router.delete('/contacts/:contactId', auth, removeContact)

router.put('/contacts/:contactId', auth, validateContact, updateContact)

router.put(
  '/contacts/:contactId/favorite',
  auth,
  validateStatusContact,
  updateStatusContact,
)

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

module.exports = router
