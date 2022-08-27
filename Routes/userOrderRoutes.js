const express = require('express')

const userOrderController = require('./../controller/userOrderController')
const router = express.Router()

router.post('/orderBooks', userOrderController.orderBook)

module.exports = router
