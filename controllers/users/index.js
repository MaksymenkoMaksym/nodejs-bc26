const Joi = require('joi')
const service = require('../../service')
require('dotenv').config()
const secret = process.env.SECRET
const passport = require('passport')
const passportJWT = require('passport-jwt')

const loginUser = async (req, res, next) => {
  const schema1 = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    favorite: Joi.boolean(),
  })

  const { error, value } = schema1.validate(req.body)
  const { name, email, phone } = value
  if (error) {
    return res.status(400).json({ message: `${error}` })
  }
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing required name field' })
  }

  try {
    const contact = await service.createContact(value)
    if (contact) {
      res.json({
        status: 'success',
        code: 201,
        data: { contact: contact },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found co`,
        data: 'Not Found',
      })
    }
    return contact
  } catch (e) {
    console.log(`Error:${e} occurred when try to add contact`)
    next(e)
  }
}

const registerUser = async (req, res, next) => {
  const { email } = req.body
  const user = await service.authUser(email)
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
      status: 'success',
      code: 201,
      data: {
        message: 'Registration successful',
      },
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = {
  loginUser,
  registerUser,
}
