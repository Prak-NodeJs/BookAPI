const mongoose = require('mongoose')

const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'required email'],
  },

  password: {
    type: String,

    required: true,
    select: false,
  },
  cPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el == this.password
      },
      message: 'password are not same',
    },
  },
})
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10)
  this.cPassword = undefined
  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPasswrod,
) {
  return await bcrypt.compare(candidatePassword, userPasswrod)
}

const User = new mongoose.model('User', userSchema)

module.exports = User
