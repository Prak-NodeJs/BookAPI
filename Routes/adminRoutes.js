const express = require('express')

const adminController = require('./../controller/adminController')
const router = express.Router()

router.post('/admin/signup', adminController.signup)
router.post('/admin/login', adminController.login)

router.get('/admin/displayallBooks', adminController.allBooks)

router.get('/admin/displayallUsers', adminController.allUsers)
router.get('/admin/getUserDetail', adminController.getUserDetails)

router.get('/admin/BookUsers', adminController.getBookUsers)

module.exports = router
