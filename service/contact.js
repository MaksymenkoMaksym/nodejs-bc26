const Contact = require('../models/contact')

const getAllContacts = async (query) => {
  const { limit = 1, page = 1 } = query
  return Contact.find(query)
    .limit(query.limit)
    .skip(page > 1 ? page * limit : 0)
}

const getContactById = (id) => {
  return Contact.findById(id)
}

const createContact = ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite })
}

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true })
}

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id })
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
}
