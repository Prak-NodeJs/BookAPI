const express = require('express')
const app = require('../app')
const User = require('./../models/userModel')
const Book = require('./../models/bookModel')
const UserOrder = require('./../models/UserOrderModel')

exports.orderBook = async (req, res, next) => {
  try {
    const username = req.body.userName
    const bookname = req.body.bookName
    const result1 = await User.findOne({ name: username })
    const result2 = await Book.findOne({ name: bookname })

    if (result1.name === username && result2.name === bookname) {
      const newUserOrder = await UserOrder.create(req.body)
      res.status(200).json({
        status: 'success',
        data: {
          order: newUserOrder,
        },
      })
    } else {
      res.status(200).json({
        status: 'Please first login then Order',
      })
    }
  } catch (err) {
    console.log(err)
  }
}
