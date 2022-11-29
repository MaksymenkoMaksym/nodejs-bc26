const User = require('../models/user')

const createUser = async ({ subscription, email, password }) => {
  const newUser = new User({ email, subscription })
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
module.exports = {
  createUser,
  updateUser,
  authUser,
}
