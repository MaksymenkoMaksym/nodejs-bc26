const service = require('../../service/contact')

const get = async (req, res, next) => {
  try {
    const contacts = await service.getAllContacts(req.query)
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
  try {
    const contact = await service.createContact(req.body)
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
  const { contactId } = req.params

  try {
    const updatedContact = await service.updateContact(contactId, req.body)

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
  const { contactId } = req.params

  try {
    const updatedContact = await service.updateContact(contactId, req.body)

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
