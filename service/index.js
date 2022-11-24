const Contact = require('./schemas/contact')

const getAllContacts = async () => {
  return Contact.find()
}

const getContactById = (id) => {
  return Contact.findById(id)
  // return Contact.findOne({ _id: id })
}

const createContact = ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite })
}

const updateContact = (id, fields) => {
  console.log(id, fields)
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
/*
 "_id": "637d272c818ea032f1e27826",
            "name": "Allen Raymond",
            "email": "nulla.ante@vestibul.co.uk",
            "phone": "(992) 914-3792",
            "favorite": false
*/
