const Joi = require('joi')
const service = require('../../service')
require('dotenv').config()
const secret = process.env.SECRET
const passport = require('passport')
const passportJWT = require('passport-jwt')

const loginUser = async (req, res, next) => {
  const { email, password } = req.body
  const isValidPassword = await service.isValidPassword(email, password)
  if (!isValidPassword) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Incorrect login or password',
      data: 'Bad request',
    })
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      password,
    },
  })
}

const registerUser = async (req, res, next) => {
  const { email, subscription, password } = req.body
  const user = await service.isValidPassword(email, password)
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

module.exports = {
  loginUser,
  registerUser,
}
