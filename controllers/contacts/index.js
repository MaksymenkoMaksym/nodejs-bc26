const Joi = require('joi')

const service = require('../../service')

const get = async (req, res, next) => {
  try {
    const contacts = await service.getAllContacts()
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'All contacts',
      data: contacts,
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await service.getContactById(contactId)
    console.log(contact)
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: contact },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
    console.log(
      `Error:${e} occurred when try to get contact with ID: ${contactId}`,
    )
  }
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await service.removeContact(contactId)
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: contact },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.log(`Error:${e} occurred`)
    next(e)
  }
}

const addContact = async (req, res, next) => {
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

const updateContact = async (req, res, next) => {
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

  const { contactId } = req.params

  if (error) {
    return res.status(400).json({ message: `${error}` })
  }
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing required field' })
  }
  try {
    const updatedContact = await service.updateContact(contactId, value)

    if (updatedContact) {
      res.json({
        status: 'success',
        code: 201,
        data: { contact: updatedContact },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found co`,
        data: 'Not Found',
      })
    }
    return updatedContact
  } catch (e) {
    console.log(`Error:${e} occurred when try to add contact`)
    next(e)
  }
}

const updateStatusContact = async (req, res, next) => {
  const schema1 = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    favorite: Joi.boolean().required(),
  })

  const { error, value } = schema1.validate(req.body)
  const { name, email, phone, favorite } = value

  const { contactId } = req.params

  if (error) {
    return res.status(400).json({ message: `${error}` })
  }
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing required field' })
  }

  if (!favorite) {
    return res.status(400).json({ message: 'missing field favorite' })
  }

  try {
    const updatedContact = await service.updateContact(contactId, value)

    if (updatedContact) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: updatedContact },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found`,
        data: 'Not Found',
      })
    }
    return updatedContact
  } catch (e) {
    console.log(`Error:${e} occurred when try to add contact`)
    next(e)
  }
}
module.exports = {
  get,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
