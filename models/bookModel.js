const mongoose = require('mongoose')

const validator = require('validator')

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
})

const Book = new mongoose.model('Book', bookSchema)

module.exports = Book
