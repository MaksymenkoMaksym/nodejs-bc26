const Joi = require('joi')
const passport = require('passport')

const validateUserData = (req, res, next) => {
  const schemaUser = Joi.object({
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    subscription: Joi.string(),
  })

  const { error } = schemaUser.validate(req.body)

  if (error) {
    return res.status(400).json({ message: `${error}` })
  }
  next()
}

const validateStatusContact = (req, res, next) => {
  const schemaStatus = Joi.object({
    favorite: Joi.boolean().required(),
  })

  const { error } = schemaStatus.validate(req.body)

  if (error) {
    return res.status(400).json({ message: `${error}` })
  }
  next()
}

const validateContact = (req, res, next) => {
  const schemaContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    favorite: Joi.boolean(),
  })

  const { error } = schemaContact.validate(req.body)

  if (error) {
    return res.status(400).json({ message: `${error}` })
  }
  next()
}

const validateUserSubscription = (req, res, next) => {
  const schemaUser = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business').required(),
  })
  const { error } = schemaUser.validate(req.body)
  if (error) {
    res.status(400).json({ message: `${error}` })
    return
  }
  next()
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

module.exports = {
  validateUserData,
  validateStatusContact,
  validateContact,
  auth,
  validateUserSubscription,
}
