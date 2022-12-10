const User = require('../models/user')
const gravatar = require('gravatar')
const { randomUUID } = require('crypto')
const sendVerificationMail = require('../helper/sendMail')

const createUser = async ({ subscription, email, password }) => {
  const avatarURL = gravatar.url(email)
  const verificationToken = randomUUID()
  sendVerificationMail(email, verificationToken)

  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  })
  newUser.setPassword(password)
  return await newUser.save()
}

const updateUser = (id, fields) => {
  return User.findOneAndUpdate({ _id: id }, fields, {
    new: true,
    runValidators: true,
  })
}

const authUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (user) {
    const result = user.validPassword(password)
    return result ? user : null
  }
  return user
}

const verifyToken = async (verificationToken) => {
  const user = await User.findOne({ verificationToken })
  return user
}

const verifyMail = async (email) => {
  const user = await User.findOne({ email })
  return user
}
module.exports = {
  createUser,
  updateUser,
  authUser,
  verifyToken,
  verifyMail,
}
