const express = require('express')
const app = require('../app')
const User = require('./../models/userModel')
// const Book = require('./../models/bookModel')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const Email = require('./../utlis/email')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    const url = `${req.protocol}://${req.get('host')}/me`
    console.log(url)
    await new Email(newUser, url).sendWelcome()

    const token = signToken(newUser._id)

    const cookie = res.cookie('jwt', token)

    console.log(cookie)

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    // if check email and password exist
    if (!email || !password) {
      return next('error')
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next('incorrct pasword')
    }
    const token = signToken(user._id)

    const cookie = res.cookie('jwt', token)

    console.log(cookie)

    res.status(200).json({
      status: 'success',
      token,
    })
  } catch (err) {
    console.log(err)
  }
}

exports.userLogout = async (req, res, next) => {
  try {
    const username = await req.params.name
    res.status(200).json({
      status: `${username} logout successfully`,
    })
  } catch (err) {
    res.status(400).send(err)
  }
}
