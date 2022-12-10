const jwt = require('jsonwebtoken')
const service = require('../../service/user')
require('dotenv').config()
const secret = process.env.SECRET

const loginUser = async (req, res, next) => {
  const { email, password } = req.body
  const user = await service.authUser(email, password)
  if (!user) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Incorrect login or password',
      data: 'Bad request',
    })
  }

  const payload = {
    id: user._id,
    email: user.email,
  }
  const token = jwt.sign(payload, secret, { expiresIn: '1h' })
  await service.updateUser(user._id, { token })

  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  })
}

const registerUser = async (req, res, next) => {
  const { email, subscription, password } = req.body
  const user = await service.authUser(email, password)
  if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    })
  }

  try {
    await service.createUser(req.body)

    res.status(201).json({
      status: 'Created',
      code: 201,
      data: {
        user: {
          email: `${email}`,
          subscription: `${subscription || 'starter'}`,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

const logoutUser = async (req, res, next) => {
  await service.updateUser(req.user._id, { token: null })

  res.status(204).json()
}

const getUserData = async (req, res, next) => {
  const { email, subscription } = req.user
  res.json({
    status: 'success',
    code: 200,
    data: {
      email,
      subscription,
    },
  })
}

const updateSubscription = async (req, res, next) => {
  const { _id: id, email } = req.user
  const { subscription } = req.body
  try {
    await service.updateUser(id, { subscription })

    res.json({
      status: 'success',
      code: 200,
      data: {
        email,
        subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

const getAvatar = async (req, res, next) => {
  const { _id: id } = req.user
  const avatarURL = req.file.path
  try {
    await service.updateUser(id, { avatarURL })

    res.json({
      status: 'success',
      code: 200,
      data: {
        avatarURL,
      },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  getUserData,
  updateSubscription,
  getAvatar,
}
