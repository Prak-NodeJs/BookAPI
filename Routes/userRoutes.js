const express = require('express')

const authController = require('./../controller/authController')
const bookController = require('./../controller/bookController')

const router = express.Router()

router.post('/users/signup', authController.signup)
router.post('/users/login', authController.login)
router.get('/users/logout/:name', authController.userLogout)

// router.post('/users/adminlogin', authController.adminLogin)

module.exports = router
