const Contact = require('./schemas/contact')
const User = require('./schemas/user')

const getAllContacts = async () => {
  return Contact.find()
}

const getContactById = (id) => {
  return Contact.findById(id)
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

const createUser = async ({ subscription, email, password }) => {
  const newUser = new User({ email })
  newUser.setPassword(password)
  await newUser.save()
}
const updateUser = (id, fields) => {
  return User.findByIdAndUpdate({ _id: id }, fields, { new: true })
}
const authUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (user) {
    const result = user.validPassword(password)
    return result ? user : null
  }
  return user
}
module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  createUser,
  updateUser,
  authUser,
}
