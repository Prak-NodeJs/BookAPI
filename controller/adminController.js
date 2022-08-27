const express = require('express')
const app = require('../app')
const Admin = require('./../models/adminModel')
const Book = require('./../models/bookModel')
const User = require('./../models/userModel')
const UserOrder = require('./../models/UserOrderModel')

exports.signup = async (req, res, next) => {
  try {
    const newAdmin = await Admin.create(req.body)

    res.status(200).json({
      status: 'success',

      data: {
        data: newAdmin,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const adminEmail = await Admin.findOne({ email: email })
    if (adminEmail.password === password) {
      res.status(200).json({
        status: 'Welcome to Admin Page',
      })
    } else {
      res.send('Invalid email or password')
    }
  } catch (err) {
    console.log(err)
  }
}

exports.allUsers = async (req, res, next) => {
  try {
    const allUSer = await User.find()

    res.status(200).json({
      status: 'List of all Users',

      data: {
        data: allUSer,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
exports.allBooks = async (req, res, next) => {
  try {
    const allBook = await Book.find()

    res.status(200).json({
      status: 'List of all Books',

      data: {
        data: allBook,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

exports.getUserDetails = async (req, res, next) => {
  try {
    const username = req.body.userName
    const result = await UserOrder.findOne({ userName: username })
    if (result.userName === username) {
      const userdetails = await UserOrder.find({ userName: username })
      res.status(200).json({
        status: `Order Details of ${username}`,
        data: {
          details: userdetails,
        },
      })
    } else {
      res.status(200).json({
        status: 'Not success',
      })
    }
  } catch (err) {
    console.log(err)
  }
}

exports.getBookUsers = async (req, res, next) => {
  try {
    const bookname = req.body.bookName
    const result = await UserOrder.findOne({ bookName: bookname })
    if (result.bookName === bookname) {
      const bookusers = await UserOrder.find({ bookName: bookname })
      res.status(200).json({
        status: `All users which has purchase ${bookname} Book `,
        data: {
          details: bookusers,
        },
      })
    } else {
      res.status(200).json({
        status: 'Not success',
      })
    }
  } catch (err) {
    console.log(err)
  }
}
