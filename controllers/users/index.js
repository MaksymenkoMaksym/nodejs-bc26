const Joi = require('joi')
const jwt = require('jsonwebtoken')
const service = require('../../service')
require('dotenv').config()
const secret = process.env.SECRET
const passport = require('passport')

const validate = (req, res) => {
  const schemaUser = Joi.object({
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    subscription: Joi.string(),
  })

  const { error, value } = schemaUser.validate(req.body)
  const { email, password } = value
  if (error) {
    return res.status(400).json({ message: `${error}` })
  }
  if (!email || !password) {
    return res.status(400).json({ message: 'missing required name field' })
  }
  return value
}

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Unauthorized',
        data: 'Unauthorized',
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

const loginUser = async (req, res, next) => {
  const { email, password } = validate(req, res)
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
  const { email, subscription, password } = validate(req, res)
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

  res.status(204).json({
    status: 'Logout success',
    code: 204,
    data: {
      token: null,
    },
  })
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

module.exports = {
  auth,
  loginUser,
  registerUser,
  logoutUser,
  getUserData,
}
