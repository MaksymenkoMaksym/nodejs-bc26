const { Schema, model } = require('mongoose')
/*

name
"Allen Raymond"
email
"nulla.ante@vestibul.co.uk"
phone
"(992) 914-3792"
favorite
false
*/
const contact = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 170,
    },
    phone: {
      type: String,
      minlength: 3,
      maxlength: 30,
      unique: true,
      required: [true, 'Phone is required'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
)

const Contact = model('contact', contact)

module.exports = Contact
