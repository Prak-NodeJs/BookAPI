const mongoose = require('mongoose')

const validator = require('validator')

const userOrderSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  numberOfBooks: {
    type: Number,
    required: true,
  },
})

const UserOrder = new mongoose.model('UserOrder', userOrderSchema)

module.exports = UserOrder
